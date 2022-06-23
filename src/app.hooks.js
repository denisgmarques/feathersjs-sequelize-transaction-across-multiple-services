// Application hooks that run for every service

/**
 * TRANSACTION IS DONE BY REQUEST
 */
const { transaction } = require('./hooks/sequelize-transaction-hook')

module.exports = {
  before: {
    all: [transaction.start()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [transaction.end()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [transaction.rollback()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
