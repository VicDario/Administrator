export interface ILogger {
  logInfo: (message: string) => void;
  logError: (message: string) => void;
  logDebug: (message: string) => void;
}
