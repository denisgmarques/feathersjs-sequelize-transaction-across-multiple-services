const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient')
  const tag = sequelizeClient.define(
    'tag',
    {
      notification_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      tag: {
        type: DataTypes.STRING(32),
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      underscored: true,
      indexes: [
        {
          fields: ['tag'],
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

  tag.associate = function (models) {
    const { notification } = models
    tag.belongsTo(notification, {
      foreignKey: { allowNull: false, name: 'notification_id' },
    })
  }

  return tag
}
