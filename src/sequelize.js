const Sequelize = require('sequelize')
const config = require('../config/config.js')

module.exports = function (app) {
  try {
    const { host, port, user, password, schema } = config.db

    const sequelize = new Sequelize(schema, user, password, {
      host:    host,
      port:    port,
      dialect: 'mysql',
      dialectOptions: { connectTimeout: 30000 },
      logging: console.log,
      // logging: false,
      define:  {
        freezeTableName: true
      },
      timezone: '-03:00',
      autoreconnect: true,
      pool: {
        max: Number(process.env.SEQUELIZE_MAX_POOL_SIZE) || 50,
        min:  Number(process.env.SEQUELIZE_MIN_POOL_SIZE) || 5,
        acquire: 30000,
        idle: 10000
      }
    })

    const oldSetup = app.setup

    app.set('sequelizeClient', sequelize)

    app.setup = function (...args) {
      const result = oldSetup.apply(this, args)

      // Set up data relationships
      const models = sequelize.models
      Object.keys(models).forEach(name => {
        if ('associate' in models[name]) {
          models[name].associate(models)
        }
      })

      // Sync to the database
      app.set('sequelizeSync', sequelize.sync())

      return result
    }
  } catch(e) {
    console.log('Ops! Database connection error!')
    console.log(e)
    process.exit(1)
  }
}
