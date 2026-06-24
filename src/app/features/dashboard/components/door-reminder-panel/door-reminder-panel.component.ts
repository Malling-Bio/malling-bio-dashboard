import { Component, Input } from '@angular/core';
import { DoorReminderView } from '../../../../core/models/door-reminder-view';

@Component({
  selector: 'app-door-reminder-panel',
  standalone: true,
  templateUrl: './door-reminder-panel.component.html',
  styleUrl: './door-reminder-panel.component.scss'
})
export class DoorReminderPanelComponent {
  @Input({required: true}) doorReminder!: DoorReminderView;

  formatSeconds(seconds: number | null): string {
    if (seconds == null) {
      return '-';
    }

    const safe = Math.max(0, seconds);
    const hours = Math.floor(safe / 3600);
    const minutes = Math.floor((safe % 3600) / 60);
    const secs = safe % 60;

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    return `${minutes}:${String(secs).padStart(2, '0')}`;
  }

  isSoon(): boolean {
    return this.doorReminder.secondsUntil !== null
      && this.doorReminder.secondsUntil <= 300
      && !this.doorReminder.triggered;
  }
}
