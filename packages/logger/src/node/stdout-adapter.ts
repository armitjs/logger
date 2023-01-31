import { LogLevel } from '../constant/log-level.js';
import type { LogAdapter, LogAdapterConfig } from '../core/adapter.js';
import type { FormatStrategy } from '../core/format-strategy.js';
import { StdoutFormatStrategy } from './stdout-format-strategy.js';

export class StdoutAdapter<T> implements LogAdapter<T> {
  private formatStrategy: FormatStrategy<T> = new StdoutFormatStrategy();
  private level = LogLevel.Info;

  constructor(options?: LogAdapterConfig<T>) {
    this.config(options);
  }

  config(config?: LogAdapterConfig<T>): LogAdapter<T> {
    if (config?.formatStrategy) {
      this.formatStrategy = config?.formatStrategy;
    }
    if (config?.logLevel) {
      this.level = config?.logLevel || this.level;
    }
    return this as LogAdapter<T>;
  }

  isLoggable(priority: LogLevel, context?: string): boolean {
    return this.level >= priority;
  }

  print(priority: LogLevel, context: string, message: T, trace?): void {
    this.formatStrategy.print(priority, context, message, trace);
  }
}
