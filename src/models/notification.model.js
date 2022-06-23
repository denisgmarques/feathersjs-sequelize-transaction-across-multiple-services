const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient')
  const notification = sequelizeClient.define(
    'notification',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      source: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      user: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      icon: {
        type: DataTypes.STRING(64),
        allowNull: true,
      },
      link: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      is_read: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
        allowNull: false,
      },
      read_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      expire_days: {
        type: DataTypes.INTEGER,
        defaultValue: 90,
        allowNull: false,
      },
      expire_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      underscored: true,
      indexes: [
        {
          fields: ['source', 'user', 'is_read'],
        },
        {
          fields: ['expire_at'],
        },
      ],
    },
    {
      hooks: {
        beforeCount(options) {
          options.raw = true
        },
      },
    }
  )

  notification.associate = function (models) {
    const { tag } = models
    notification.hasMany(tag, {
      foreignKey: { allowNull: true, name: 'notification_id' },
    })
  }

  return notification
}
