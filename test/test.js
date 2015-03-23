// run with command
// DEBUG=sentry node test/test.js
var ravenExpress = require('..');

var middleRegister = ravenExpress({
  env: 'development',
  publicKey: '1234',
  secretKey: 'abcd',
  projectId: '101'
});

console.assert(typeof middleRegister === 'function', 'got registration function');
// var app = express();
// middleRegister(app);

// cause an exception
throw new Error('Bad things happen');
