const moment = require('moment')
const Service = require( 'feathers-sequelize').Service

exports.Notification = class Notification extends Service {
  async setup(app) {
    this.app = app
  }

  async create (data, params) {
    const tagService = this.app.service('tag')

    /**
     * EXPIRE_AT FROM EXPIRE_DAYS
     */
    if (!data.expire_days) data.expire_days = 90 // Default
    data.expire_at = moment().add(data.expire_days, 'days').calendar()

    /**
     * INSERTING NOTIFICATION AND TAGS IN THE SAME TRANSACTION (See app.hooks.js)
     *  Call create function from superclass (Service) - Default behaviour
     *  because this is the overwritten create function
     *  and we don't want to call it recursively
     */
    let newInstance = await super.create(data, params)

    if (!data.tags || data.tags.length == 0) {
      return newInstance
    } else {
      let promiseArr = []
      data.tags.forEach(tagText => {
        promiseArr.push(tagService.create({ 'tag': tagText, 'notification_id': newInstance.id }, params))
      })

      return Promise.all(promiseArr)
        .then(result => {
          newInstance.tags = result
          return newInstance
        })
    }
  }
}
