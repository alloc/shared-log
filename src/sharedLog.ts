import EventEmitter = require('events')
import callsites = require('callsites')

const events = new EventEmitter()
const levels = ['debug', 'verbose', 'info', 'warn', 'error'] as const

export type LogLevel = typeof levels[number]

type LogMethods = { [P in LogLevel]: (...args: any[]) => void }

export interface SharedLog extends LogMethods {
  (...args: any[]): void
  /**
   * The end user should use this to attach a logging library
   * of their choosing. Although, the `"all"` event might be
   * more convenient, depending on which library they choose.
   */
  on(event: LogLevel, handler: (args: any[], filename?: string) => void): this
  /** Handle all log levels with the same function. */
  on(
    event: 'all',
    handler: (event: LogLevel, args: any[], filename?: string) => void
  ): this
  /** The underlying event emitter */
  events: EventEmitter
}

const log: SharedLog = ((...args: any[]) =>
  emit('info', args, callerPath())) as any

log.on = (event: string, handler: any) => (events.on(event, handler), log)

levels.forEach(level => {
  log[level] = (...args: any[]) => emit(level, args, callerPath())
})

log.events = events

export { log, log as default }

/**
 * Logging utilities can call this instead of `log` and use `callerPath`
 * to include their caller's filename instead of the utility's filename.
 */
export function emit(level: LogLevel, args: any[], filename?: string) {
  if (events.listenerCount(level)) {
    events.emit(level, args, filename)
  } else if (defaultHandlers[level] && !events.listenerCount('all')) {
    defaultHandlers[level](...args)
  }
  events.emit('all', level, args, filename)
}

// The "debug" and "verbose" levels are ignored by default.
const defaultHandlers: any = {
  debug: null,
  verbose: null,
  info: console.log,
  warn: console.warn,
  error: console.error,
}

/**
 * Get the file name of somewhere in the call stack.
 *
 * @param depth The number of frames to skip, where zero means "the immediate caller"
 */
export function callerPath(depth = 0) {
  for (const callsite of callsites()) {
    const file = callsite.getFileName()
    if (file && --depth < -2) {
      return file
    }
  }
}
