// Initializes the `instance` service on path `/instance`
const { Tag } = require('./tag.class')
const createModel = require('../../models/tag.model')
const hooks = require('./tag.hooks')

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/tag', new Tag(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('tag')

  service.hooks(hooks)
}
