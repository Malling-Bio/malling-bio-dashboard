import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ScreenTimingPlan} from '../../../../core/models/screen-timing-plan';

@Component({
  selector: 'app-timing-plan-panel',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './timing-plan-panel.component.html',
  styleUrl: './timing-plan-panel.component.scss'
})
export class TimingPlanPanelComponent {
  @Input({required: true}) screenId!: string;
  @Input() busy = false;
  @Input() timingPlan: ScreenTimingPlan | null = null;

  @Output() setTimingPlan = new EventEmitter<{
    screenId: string;
    introStartAt: string;
    publicStartAt: string;
    autoStartEnabled: boolean;
  }>();

  introStartLocal = '';
  publicStartLocal = '';
  autoStartEnabled = true;

  onSubmit(): void {
    if (this.busy) {
      return;
    }

    const introStartAt = this.toUtcIso(this.introStartLocal);
    const publicStartAt = this.toUtcIso(this.publicStartLocal);

    if (!introStartAt || !publicStartAt) {
      return;
    }

    const payload = {
      screenId: this.screenId,
      introStartAt,
      publicStartAt,
      autoStartEnabled: this.autoStartEnabled
    };

    this.setTimingPlan.emit(payload);
  }

  get canSubmit(): boolean {
    return !this.busy
      && !!this.toUtcIso(this.introStartLocal)
      && !!this.toUtcIso(this.publicStartLocal);
  }

  private toUtcIso(value: string): string | null {
    if (!value) {
      return null;
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    return date.toISOString().replace(/\.\d{3}Z$/, 'Z');
  }

  formatIso(value: string | null | undefined): string {
    return value ?? '-';
  }
  formatUtcToLocal(value: string | null | undefined): string {
    if (!value) {
      return 'No timing plan';
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    const pad = (n: number) => String(n).padStart(2, '0');

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return `${day}/${month}/${year} ${hours}.${minutes}`;
  }
}
