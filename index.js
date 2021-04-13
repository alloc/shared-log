const globalId = Symbol.for('shared-log')

// Ensure only one copy of shared-log exists.
module.exports =
  global[globalId] || (global[globalId] = require('./dist/sharedLog'))
