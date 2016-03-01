# raven-express

> Flexible Sentry Raven client initialization for Node Express server

[![NPM][raven-express-icon] ][raven-express-url]

[![Build status][raven-express-ci-image] ][raven-express-ci-url]
[![semantic-release][semantic-image] ][semantic-url]

## Use example

```js
// npm install --save raven-express
var ravenExpress = require('raven-express');
// installs global global error hook.
// only production environment sends errors to Sentry
// everything else only prints the errors to the console
var middleRegister = ravenExpress({
  env: 'development', // or whatever your config needs
  publicKey: '...',
  secretKey: '...',
  projectId: '...',
  domain: '...',
  release: 'commit id or similar' // optional, will be 'development' if not set
});
// returns a function you can call to register middleware
middleRegister(app); // where app is express instance
```

Usually, Sentry just gives you a single url like `https://publicKey:secretKey@domain/projectId`.
For domain, we set `https` always.

## Debug and details

The error logging is using [debug-logdown](https://github.com/bahmutov/debug-logdown) under prefix
`sentry`. You can see diagnostic messages by setting environment variable

    DEBUG=sentry node server.js

For more details why crash reporting is important for high quality apps, see 
[Know unknown unknowns with Sentry](http://glebbahmutov.com/blog/know-unknown-unknowns-with-sentry/) and
my [other Sentry blog posts](http://glebbahmutov.com/blog/tags/sentry/).

`release` - optional commit id or some other identifier to tag the collected errors, see
[release](http://raven-js.readthedocs.org/en/latest/config/index.html?highlight=release#release) docs.

### Small print

Author: Gleb Bahmutov &copy; 2015

* [@bahmutov](https://twitter.com/bahmutov)
+ [glebbahmutov.com](http://glebbahmutov.com)
+ [blog](http://glebbahmutov.com/blog)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/raven-express/issues) on Github

## MIT License

Copyright (c) 2015 Gleb Bahmutov

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[raven-express-icon]: https://nodei.co/npm/raven-express.png?downloads=true
[raven-express-url]: https://npmjs.org/package/raven-express
[raven-express-ci-image]: https://travis-ci.org/bahmutov/raven-express.png?branch=master
[raven-express-ci-url]: https://travis-ci.org/bahmutov/raven-express
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
