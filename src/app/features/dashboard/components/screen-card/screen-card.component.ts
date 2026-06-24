import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ScreenView } from '../../../../core/models/screen-view';
import { ScreenStateBadgeComponent } from '../screen-state-badge/screen-state-badge.component';
import { SnapshotPanelComponent } from '../snapshot-panel/snapshot-panel.component';
import { DoorReminderPanelComponent } from '../door-reminder-panel/door-reminder-panel.component';
import { ExecutionReportPanelComponent } from '../execution-report-panel/execution-report-panel.component';
import { ScreenActionsPanelComponent } from '../screen-actions-panel/screen-actions-panel.component';
import { TimingPlanPanelComponent } from '../timing-plan-panel/timing-plan-panel.component';

@Component({
  selector: 'app-screen-card',
  standalone: true,
  imports: [
    ScreenStateBadgeComponent,
    SnapshotPanelComponent,
    DoorReminderPanelComponent,
    ExecutionReportPanelComponent,
    ScreenActionsPanelComponent,
    TimingPlanPanelComponent
  ],
  templateUrl: './screen-card.component.html',
  styleUrl: './screen-card.component.scss'
})
export class ScreenCardComponent {
  @Input({ required: true }) screen!: ScreenView;
  @Input() busy = false;

  @Output() sendEvent = new EventEmitter<{ screenId: string; event: string }>();
  @Output() setSupervisorState = new EventEmitter<{ screenId: string; state: string }>();
  @Output() setTimingPlan = new EventEmitter<{
    screenId: string;
    introStartAt: string;
    publicStartAt: string;
    autoStartEnabled: boolean;
  }>();
}
