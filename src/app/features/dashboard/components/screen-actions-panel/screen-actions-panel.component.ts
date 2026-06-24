import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-screen-actions-panel',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './screen-actions-panel.component.html',
  styleUrl: './screen-actions-panel.component.scss'
})
export class ScreenActionsPanelComponent {
  @Input({ required: true }) screenId!: string;
  @Input() busy = false;

  @Output() sendEvent = new EventEmitter<{ screenId: string; event: string }>();
  @Output() setSupervisorState = new EventEmitter<{ screenId: string; state: string }>();

  selectedEvent = 'PUBLIC_START_REACHED';
  selectedState = 'INTRO_LOOP';

  readonly availableEvents = [
    { value: 'NEXT_SHOW_WINDOW_OPENED', label: 'Next show window opened' },
    { value: 'PUBLIC_START_REACHED', label: 'Public start reached' },
    { value: 'EARLY_START_REQUESTED', label: 'Early start requested' },
    { value: 'DELAY_REQUESTED', label: 'Delay requested' },
    { value: 'DOOR_REMINDER_REACHED', label: 'Door reminder reached' },
    { value: 'DOORS_CONFIRMED', label: 'Doors confirmed' },
    { value: 'SHOW_FINISHED', label: 'Show finished' },
    { value: 'PREPARE_NEXT_COMPLETED', label: 'Prepare next completed' }
  ];

  readonly availableStates = [
    { value: 'IDLE', label: 'IDLE' },
    { value: 'INTRO_LOOP', label: 'INTRO_LOOP' },
    { value: 'STARTING', label: 'STARTING' },
    { value: 'REKLAMER', label: 'REKLAMER' },
    { value: 'TRAILERS', label: 'TRAILERS' },
    { value: 'FEATURE', label: 'FEATURE' },
    { value: 'ENDING', label: 'ENDING' },
    { value: 'PREPARE_NEXT', label: 'PREPARE_NEXT' }
  ];

  onSendEvent(): void {
    this.sendEvent.emit({
      screenId: this.screenId,
      event: this.selectedEvent
    });
  }

  onSetSupervisorState(): void {
    this.setSupervisorState.emit({
      screenId: this.screenId,
      state: this.selectedState
    });
  }
}
