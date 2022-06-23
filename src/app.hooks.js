// Application hooks that run for every service

/**
 * TRANSACTION IS DONE BY REQUEST
 */
const { transaction } = require('./hooks/sequelize-transaction-hook')

module.exports = {
  before: {
    all: [transaction.begin()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [transaction.commit()],
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
