/* eslint-disable require-atomic-updates */
const start = (options = {}) => {
  return async hook => {
    if (hook.params.transaction || (hook.params.sequelize && options.params.sequelize.transaction)) {
      // console.trace('Using the existing transaction')
      return hook
    }

    const sequelize = hook.app.get('sequelizeClient')
    const transaction = await sequelize.transaction()

    hook.params.transaction = transaction
    hook.params.sequelize = hook.params.sequelize || {}
    hook.params.sequelize.transaction = transaction

    return hook
  }
}

const end = () => {
  return hook => {
    const trx = hook.params.sequelize.transaction || hook.params.transaction

    if (!trx || trx.finished) return hook

    return trx.commit().then(() => {
      delete hook.params.sequelize.transaction
      delete hook.params.transaction
      return hook
    })
  }
}

const rollback = () => {
  return hook => {
    const trx = hook.params.sequelize.transaction || hook.params.transaction

    if (!trx || trx.finished) return hook

    return trx.rollback().then(() => {
      console.error(hook.error)
      delete hook.params.sequelize.transaction
      delete hook.params.transaction
      return hook
    })
  }
}

module.exports = {
  transaction: {
    start,
    end,
    rollback
  }
}
