const notification = require('./notification/notification.service.js')
const tag = require('./tag/tag.service.js')

// eslint-disable-next-line no-unused-vars
module.exports = async function (app) {
  app.configure(notification)
  app.configure(tag)
  console.log('[Services] - Services started')
}
