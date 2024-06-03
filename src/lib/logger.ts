export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR'
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  data?: unknown;
}

const log = (entry: LogEntry) => {
  const consoleMethod = entry.level === LogLevel.ERROR ? 'error' : 'log';
  if (entry.data) {
    console[consoleMethod](
      `${entry.timestamp.toISOString()} [${entry.level}] ${entry.message}`,
      entry.data
    );
  } else {
    console[consoleMethod](`${entry.timestamp.toISOString()} [${entry.level}] ${entry.message}`);
  }
};

export const logger = {
  debug: (message: string, data?: unknown) =>
    log({ level: LogLevel.DEBUG, message, timestamp: new Date(), data }),
  info: (message: string, data?: unknown) =>
    log({ level: LogLevel.INFO, message, timestamp: new Date(), data }),
  warn: (message: string, data?: unknown) =>
    log({ level: LogLevel.WARN, message, timestamp: new Date(), data }),
  error: (message: string, data?: unknown) =>
    log({ level: LogLevel.ERROR, message, timestamp: new Date(), data })
};
