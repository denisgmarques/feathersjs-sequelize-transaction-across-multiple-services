// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  // Add your custom middleware here. Remember that
  // in Express, the order matters.
  process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection')
    console.error(reason)
    process.exit(1)
  })
}
