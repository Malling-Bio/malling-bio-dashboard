import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExecutionReportPanelComponent} from './execution-report-panel.component';
import {ActionExecutionReport} from '../../../../core/models/action-execution-report';

describe('ExecutionReportPanelComponent', () => {
  let component: ExecutionReportPanelComponent;
  let fixture: ComponentFixture<ExecutionReportPanelComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutionReportPanelComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ExecutionReportPanelComponent);
    component = fixture.componentInstance;
    host = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    component.report = null;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should show empty message when report is null', () => {
    component.report = null;
    fixture.detectChanges();

    expect(host.textContent).toContain('Ingen execution report endnu.');
  });

  it('should render report values when report exists', () => {
    component.report = createReport({
      requestedActions: ['STOP_SCHEDULER', 'PLAY'],
      executedActions: ['STOP_SCHEDULER', 'PLAY'],
      skippedActions: ['ACTIVATE_DOOR_REMINDER'],
      errors: ['PLAY: boom'],
      executedAt: '2026-06-21T10:15:00Z'
    });

    fixture.detectChanges();

    const text = host.textContent ?? '';

    expect(text).toContain('Requested:');
    expect(text).toContain('STOP_SCHEDULER, PLAY');

    expect(text).toContain('Executed:');
    expect(text).toContain('STOP_SCHEDULER, PLAY');

    expect(text).toContain('Skipped:');
    expect(text).toContain('ACTIVATE_DOOR_REMINDER');

    expect(text).toContain('Errors:');
    expect(text).toContain('PLAY: boom');

    expect(text).toContain('Executed at:');
    expect(text).toContain('2026-06-21T10:15:00Z');
  });

  it('should show "-" for empty action/error lists', () => {
    component.report = createReport({
      requestedActions: [],
      executedActions: [],
      skippedActions: [],
      errors: []
    });

    fixture.detectChanges();

    const text = host.textContent ?? '';

    expect(text).toContain('Requested: -');
    expect(text).toContain('Executed: -');
    expect(text).toContain('Skipped: -');
    expect(text).toContain('Errors: -');
  });

  it('join should return "-" for empty array', () => {
    expect(component.join([])).toBe('-');
  });

  it('join should return comma separated string for values', () => {
    expect(component.join(['STOP_SCHEDULER', 'PLAY'])).toBe('STOP_SCHEDULER, PLAY');
  });

  function createReport(
    overrides: Partial<ActionExecutionReport> = {}
  ): ActionExecutionReport {
    return {
      screenId: 'SAL1',
      requestedActions: ['STOP_SCHEDULER'],
      executedActions: ['STOP_SCHEDULER'],
      skippedActions: [],
      errors: [],
      executedAt: '2026-06-21T10:00:00Z',
      ...overrides
    };
  }
});
