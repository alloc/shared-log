# shared-log

[![npm](https://img.shields.io/npm/v/shared-log.svg)](https://www.npmjs.com/package/shared-log)
[![Bundle size](https://badgen.net/bundlephobia/min/shared-log)](https://bundlephobia.com/result?p=shared-log)
[![Code style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/alecdotbiz)

> Decoupled logging for libraries

&nbsp;

### Usage

Libraries should import `shared-log` and treat it as write-only.

"Reading" the log (via event listener) is reserved for the end user.

```ts
import log from 'shared-log'

// The log function is console.log by default
log('all arguments', 'are passed thru')

// Log methods exist for each log level
log.error(new Error('ruh roh'))
log.warn(...)
log.info(...)
log.verbose(...)
log.debug(...)
```

The end user hooks up their logging library of choice.

```ts
import log from 'shared-log'

// Listen to every log level
log.on('all', (level, args, filename) => {...})

// or a specific log level
log.on('error', (args, filename) => {...})
```

If the end user doesn't add a log listener, the `console` is used by default, but the `debug` and `verbose` log levels are ignored by default.
