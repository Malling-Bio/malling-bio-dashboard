export interface ActionExecutionReport {
  screenId: string;
  requestedActions: string[];
  executedActions: string[];
  skippedActions: string[];
  errors: string[];
  executedAt: string;
}
