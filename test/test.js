// run with command
// DEBUG=sentry node test/test.js

const la = require('lazy-ass')
const is = require('check-more-types')
const ravenExpress = require('..')

const middleRegister = ravenExpress({
  env: 'development',
  publicKey: '1234',
  secretKey: 'abcd',
  projectId: '101',
  domain: 'app.getsentry.com',
  release: 'commit id here'
})

la(is.fn(middleRegister), 'got registration function')

// var app = express()
// middleRegister(app)

console.log('causing an exception on purpose')
throw new Error('Bad things happen')
