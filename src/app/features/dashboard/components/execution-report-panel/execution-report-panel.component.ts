import {Component, Input} from '@angular/core';
import {ActionExecutionReport} from '../../../../core/models/action-execution-report';

@Component({
  selector: 'app-execution-report-panel',
  standalone: true,
  templateUrl: './execution-report-panel.component.html',
  styleUrl: './execution-report-panel.component.scss'
})
export class ExecutionReportPanelComponent {
  @Input() report: ActionExecutionReport | null = null;

  join(values: string[]): string {
    return values.length ? values.join(', ') : '-';
  }
}
