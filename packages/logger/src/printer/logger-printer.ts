import { DEFAULT_CONTEXT } from '../constant/default-context.js';
import { LogLevel } from '../constant/log-level.js';
import type { LogAdapter, LogAdapterConfig } from '../core/adapter.js';
import type { LogPrinter } from './printer.js';

export class LoggerPrinter<T> implements LogPrinter<T> {
  private logAdapters: LogAdapter<T>[] = [];

  error(message: T, context?: string, trace?): void {
    this.print(LogLevel.Error, message, context, trace);
  }

  warn(message: T, context?: string): void {
    this.print(LogLevel.Warn, message, context);
  }

  info(message: T, context?: string): void {
    this.print(LogLevel.Info, message, context);
  }

  verbose(message: T, context?: string): void {
    this.print(LogLevel.Verbose, message, context);
  }

  debug(message: T, context?: string): void {
    this.print(LogLevel.Debug, message, context);
  }

  addAdapter(adapter: LogAdapter<T>, config?: LogAdapterConfig<T> | undefined) {
    this.logAdapters.push(adapter.config(config));
    return this;
  }

  clearLogAdapters() {
    this.logAdapters = [];
    return this;
  }

  private print(priority: LogLevel, message: T, context?: string, trace?) {
    if (!message) {
      message = 'Empty/NULL log message' as T;
    }

    if (!context) {
      context = DEFAULT_CONTEXT;
    }

    if (this.logAdapters.length === 0) {
      throw new Error(`No registered adapters were found!`);
    }

    for (let index = 0; index < this.logAdapters.length; index++) {
      const adapter = this.logAdapters[index];
      const loggable = adapter.isLoggable(priority, context);
      if (loggable) {
        adapter.print(priority, context, message, trace);
      }
    }
  }
}
