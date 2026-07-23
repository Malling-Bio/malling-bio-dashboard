import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ScreenView} from '../../../../core/models/screen-view';
import {ScreenStateBadgeComponent} from '../screen-state-badge/screen-state-badge.component';
import {SnapshotPanelComponent} from '../snapshot-panel/snapshot-panel.component';
import {DoorReminderPanelComponent} from '../door-reminder-panel/door-reminder-panel.component';
import {TimingPlanPanelComponent} from '../timing-plan-panel/timing-plan-panel.component';
import {AppMode} from '../../../../core/models/app-mode';

@Component({
  selector: 'app-screen-card',
  standalone: true,
  imports: [
    ScreenStateBadgeComponent,
    SnapshotPanelComponent,
    DoorReminderPanelComponent,
    TimingPlanPanelComponent
  ],
  templateUrl: './screen-card.component.html',
  styleUrl: './screen-card.component.scss'
})
export class ScreenCardComponent {
  @Input({required: true}) screen!: ScreenView;
  @Input() busy = false;
  @Input() appMode: AppMode | null = null;
  @Input() showSimulationTools = false;

  @Output() startShow = new EventEmitter<string>();
  @Output() setTimingPlan = new EventEmitter<{
    screenId: string;
    introStartAt: string;
    publicStartAt: string;
    autoStartEnabled: boolean;
  }>();

  get canStartShow(): boolean {
    if (this.appMode !== 'MANUAL') {
      return false;
    }

    if (this.screen.runtime.supervisedState !== 'INTRO_LOOP') {
      return false;
    }

    if (this.busy) {
      return false;
    }

    const publicStartAt = this.screen.runtime.timingPlan?.publicStartAt;

    if (!publicStartAt) {
      return false;
    }

    const publicStartMs = new Date(publicStartAt).getTime();

    if (Number.isNaN(publicStartMs)) {
      return false;
    }

    const nowMs = Date.now();
    const earliestEnableMs = publicStartMs - 60_000;

    return nowMs >= earliestEnableMs;
  }
  get isStartShowOverdue(): boolean {
    if (this.appMode !== 'MANUAL') {
      return false;
    }

    if (this.screen.runtime.supervisedState !== 'INTRO_LOOP') {
      return false;
    }

    const publicStartAt = this.screen.runtime.timingPlan?.publicStartAt;

    if (!publicStartAt) {
      return false;
    }

    const publicStartMs = new Date(publicStartAt).getTime();

    if (Number.isNaN(publicStartMs)) {
      return false;
    }

    return Date.now() > publicStartMs;
  }

  get startShowHelpText(): string | null {
    if (this.appMode !== 'MANUAL') {
      return null;
    }

    if (this.screen.runtime.supervisedState !== 'INTRO_LOOP') {
      return 'Tilgængelig i Intro loop';
    }

    const publicStartAt = this.screen.runtime.timingPlan?.publicStartAt;

    if (!publicStartAt) {
      return 'Kræver public start i timingplan';
    }

    const publicStartMs = new Date(publicStartAt).getTime();

    if (Number.isNaN(publicStartMs)) {
      return 'Ugyldig public start i timingplan';
    }

    const nowMs = Date.now();
    const diffMs = publicStartMs - nowMs;

    if (diffMs > 60_000) {
      return 'Bliver aktiv 1 min før public start';
    }

    if (diffMs >= 0) {
      return 'Klar til start';
    }

    return 'Public start er passeret — showet burde være startet';
  }
}
