import {Component, Input} from '@angular/core';
import {ScreenRuntimeStatus} from '../../../../core/models/screen-runtime-status';

@Component({
  selector: 'app-snapshot-panel',
  standalone: true,
  templateUrl: './snapshot-panel.component.html',
  styleUrl: './snapshot-panel.component.scss'
})
export class SnapshotPanelComponent {
  @Input({required: true}) runtime!: ScreenRuntimeStatus;
}
