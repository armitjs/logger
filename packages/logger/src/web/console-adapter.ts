import { LogLevel } from '../constant/log-level.js';
import type { LogAdapter, LogAdapterConfig } from '../core/adapter.js';
import type { FormatStrategy } from '../core/format-strategy.js';
import { ConsoleFormatStrategy } from './console-format-strategy.js';

export class ConsoleAdapter<MessageType> implements LogAdapter<MessageType> {
  private formatStrategy: FormatStrategy<MessageType> =
    new ConsoleFormatStrategy<MessageType>();
  private level = LogLevel.Info;

  constructor(options?: LogAdapterConfig<MessageType>) {
    this.config(options);
  }

  config(config?: LogAdapterConfig<MessageType>): LogAdapter<MessageType> {
    if (config?.formatStrategy) {
      this.formatStrategy = config?.formatStrategy;
    }
    if (config?.logLevel) {
      this.level = config?.logLevel || this.level;
    }
    return this as LogAdapter<MessageType>;
  }

  isLoggable(priority: LogLevel, context?: string): boolean {
    return this.level >= priority;
  }

  print(
    priority: LogLevel,
    context: string,
    message: MessageType,
    trace?
  ): void {
    this.formatStrategy.print(priority, context, message, trace);
  }
}
