import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AppMode} from '../../../../core/models/app-mode';

@Component({
  selector: 'app-app-mode-banner',
  standalone: true,
  templateUrl: './app-mode-banner.component.html',
  styleUrl: './app-mode-banner.component.scss'
})
export class AppModeBannerComponent {
  @Input() appMode: AppMode | null = null;
  @Input() screenCount = 0;
  @Input() loading = false;
  @Input() busy = false;
  @Input() error: string | null = null;

  @Output() modeChange = new EventEmitter<AppMode>();

  readonly modes: AppMode[] = ['AUTO', 'MANUAL', 'MAINTENANCE'];

  isActive(mode: AppMode): boolean {
    return this.appMode === mode;
  }
}
