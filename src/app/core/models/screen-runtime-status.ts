import { ScreenSnapshot } from './screen-snapshot';
import { ScreenTimingPlan } from './screen-timing-plan';

export interface ScreenRuntimeStatus {
  screenId: string;
  snapshot: ScreenSnapshot;
  supervisedState: string;
  lastActions: string[];
  timingPlan: ScreenTimingPlan | null;
  updatedAt: string;
}
