import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-screen-state-badge',
  standalone: true,
  templateUrl: './screen-state-badge.component.html',
  styleUrl: './screen-state-badge.component.scss'
})
export class ScreenStateBadgeComponent {
  @Input({required: true}) state!: string;

  toneClass(): string {
    switch (this.state) {
      case 'FEATURE':
        return 'feature';
      case 'STARTING':
      case 'INTRO_LOOP':
        return 'starting';
      case 'ENDING':
        return 'ending';
      case 'NO_CONNECTION':
        return 'no-connection';
      default:
        return 'default';
    }
  }
}
