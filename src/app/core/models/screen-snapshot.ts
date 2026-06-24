export interface ScreenSnapshot {
  screenId: string;
  connectivity: string;
  operational: string;
  schedulerRunning: boolean;
  currentContentTitle: string | null;
  currentContentKind: string | null;
  showStatus: string;
  lastError: string | null;
  observedAt: string;
}
