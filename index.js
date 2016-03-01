// see http://glebbahmutov.com/blog/know-unknown-unknowns-with-sentry/

Error.stackTraceLimit = 100

var sentryLogger = require('debug-logdown')('sentry')

/* jshint -W098 */
function onError (err, req, res, next) {
  /* eslint no-unused-vars:0 */
  // next must be declared in order to get the full signature with error
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  if (res.sentry) {
    sentryLogger.error(res.sentry)
  }
  sentryLogger.error(err.stack)

  res.statusCode = 500
  if (res.sentry) {
    res.end(res.sentry + '\n')
  } else {
    res.end(err.message + '\n')
  }
}
/* jshint +W098 */

function formSentryUrl (opts) {
  if (!opts.publicKey || !opts.secretKey || !opts.projectId) {
    throw new Error('Missing public, secret or project id in ' + JSON.stringify(opts, null, 2))
  }
  return 'https://' + opts.publicKey + ':' + opts.secretKey + '@app.getsentry.com/' + opts.projectId
}

module.exports = function registerGlobalExceptionHandler (opts) {
  opts = opts || {}
  var env = opts.env || 'development'
  var release = opts.release || 'dev'
  sentryLogger.info('seting up Sentry crash reporting for', env)

  var sentryOptions = {
    release: release
  }

  function logError () {
    var args = Array.prototype.slice.call(arguments, 0)
    console.log('args', args)

    args.forEach(function (msg) {
      if (msg instanceof Error) {
        sentryLogger.error(msg.stack)
      } else {
        sentryLogger.error(msg)
      }
    })
  }

  var raven = require('raven')
  var client

  if (env === 'development') {
    global.Raven = {
      captureMessage: sentryLogger.info,
      captureException: logError
    }

    var mockSentryUrl = formSentryUrl({
      publicKey: '1234',
      secretKey: 'abcd',
      projectId: '101'
    })
    client = new raven.Client(mockSentryUrl, sentryOptions)
    client.patchGlobal(logError)

    return function mockSentryMiddleware (app) {
      app.use(onError)
    }
  } else {
    var sentryUrl = formSentryUrl(opts)
    client = new raven.Client(sentryUrl, sentryOptions)
    client.patchGlobal()

    global.Raven = client

    return function registerSentryInExpress (app) {
      app.use(raven.middleware.express(sentryUrl))
      app.use(onError)
    }
  }
}
