const globalId = Symbol.for('shared-log')
namespace NodeJS {
  export interface Global {
    [globalId]: typeof import('./sharedLog')
  }
}

// Ensure only one copy of shared-log exists.
module.exports = global[globalId] || (global[globalId] = require('./sharedLog'))
