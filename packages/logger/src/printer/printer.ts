import type { LogAdapter, LogAdapterConfig } from '../core/adapter.js';

export interface LogPrinter<T> {
  error(message: T, context?: string, trace?): void;
  warn(message: T, context?: string): void;
  info(message: T, context?: string): void;
  verbose(message: T, context?: string): void;
  debug(message: T, context?: string): void;
  addAdapter(
    adapter: LogAdapter<T>,
    config?: LogAdapterConfig<T>
  ): LogPrinter<T>;
  clearLogAdapters(): LogPrinter<T>;
}
