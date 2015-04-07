// run with command
// DEBUG=sentry node test/test.js
var ravenExpress = require('..');

var middleRegister = ravenExpress({
  env: 'development',
  publicKey: '1234',
  secretKey: 'abcd',
  projectId: '101',
  release: 'commit id here'
});

console.assert(typeof middleRegister === 'function', 'got registration function');
// var app = express();
// middleRegister(app);

console.log('causing an exception on purpose');
throw new Error('Bad things happen');
