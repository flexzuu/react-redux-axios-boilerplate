/* eslint no-console: 0 */

export default class Logger {
  constructor(name) {
    this.name = name;
  }
  log(...args) {
    console.log(`[${this.name}]`, ...args);
  }
  error(...args) {
    console.error(`[${this.name}]`, ...args);
  }
  info(...args) {
    console.info(`[${this.name}]`, ...args);
  }
  warn(...args) {
    console.warn(`[${this.name}]`, ...args);
  }
}
