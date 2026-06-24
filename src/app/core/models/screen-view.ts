import {ScreenRuntimeStatus} from './screen-runtime-status';
import {ActionExecutionReport} from './action-execution-report';
import {DoorReminderView} from './door-reminder-view';

export interface ScreenView {
  screenId: string;
  runtime: ScreenRuntimeStatus;
  lastExecutionReport: ActionExecutionReport | null;
  doorReminder: DoorReminderView;
}
