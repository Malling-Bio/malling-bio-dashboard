import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { ScreenCardComponent } from './screen-card.component';
import { ScreenView } from '../../../../core/models/screen-view';
import { ScreenActionsPanelComponent } from '../screen-actions-panel/screen-actions-panel.component';
import { TimingPlanPanelComponent } from '../timing-plan-panel/timing-plan-panel.component';

describe('ScreenCardComponent', () => {
  let component: ScreenCardComponent;
  let fixture: ComponentFixture<ScreenCardComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ScreenCardComponent);
    component = fixture.componentInstance;
    host = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    component.screen = createScreen();

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should render screen id', () => {
    component.screen = createScreen({
      screenId: 'SAL2',
      runtime: {
        ...createScreen().runtime,
        screenId: 'SAL2',
        snapshot: {
          ...createScreen().runtime.snapshot,
          screenId: 'SAL2'
        }
      }
    });

    fixture.detectChanges();

    expect(host.textContent).toContain('SAL2');
  });

  it('should render supervised state badge', () => {
    component.screen = createScreen({
      runtime: {
        ...createScreen().runtime,
        supervisedState: 'FEATURE'
      }
    });

    fixture.detectChanges();

    expect(host.textContent).toContain('FEATURE');
  });

  it('should render child panels', () => {
    component.screen = createScreen();

    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('app-snapshot-panel'))).not.toBeNull();
    expect(fixture.debugElement.query(By.css('app-door-reminder-panel'))).not.toBeNull();
    expect(fixture.debugElement.query(By.css('app-execution-report-panel'))).not.toBeNull();
    expect(fixture.debugElement.query(By.css('app-screen-actions-panel'))).not.toBeNull();
    expect(fixture.debugElement.query(By.css('app-timing-plan-panel'))).not.toBeNull();
  });

  it('should pass busy to screen actions panel', () => {
    component.screen = createScreen();
    component.busy = true;

    fixture.detectChanges();

    const actionsPanel = fixture.debugElement.query(
      By.directive(ScreenActionsPanelComponent)
    ).componentInstance as ScreenActionsPanelComponent;

    expect(actionsPanel.busy).toBe(true);
  });

  it('should pass busy to timing plan panel', () => {
    component.screen = createScreen();
    component.busy = true;

    fixture.detectChanges();

    const timingPlanPanel = fixture.debugElement.query(
      By.directive(TimingPlanPanelComponent)
    ).componentInstance as TimingPlanPanelComponent;

    expect(timingPlanPanel.busy).toBe(true);
  });

  it('should re-emit sendEvent from screen actions panel', () => {
    component.screen = createScreen();
    fixture.detectChanges();

    const emitSpy = vi.spyOn(component.sendEvent, 'emit');

    const actionsPanel = fixture.debugElement.query(
      By.directive(ScreenActionsPanelComponent)
    ).componentInstance as ScreenActionsPanelComponent;

    actionsPanel.sendEvent.emit({ screenId: 'SAL1', event: 'START_SHOW' });

    expect(emitSpy).toHaveBeenCalledWith({
      screenId: 'SAL1',
      event: 'START_SHOW'
    });
  });

  it('should re-emit setSupervisorState from screen actions panel', () => {
    component.screen = createScreen();
    fixture.detectChanges();

    const emitSpy = vi.spyOn(component.setSupervisorState, 'emit');

    const actionsPanel = fixture.debugElement.query(
      By.directive(ScreenActionsPanelComponent)
    ).componentInstance as ScreenActionsPanelComponent;

    actionsPanel.setSupervisorState.emit({
      screenId: 'SAL1',
      state: 'FEATURE'
    });

    expect(emitSpy).toHaveBeenCalledWith({
      screenId: 'SAL1',
      state: 'FEATURE'
    });
  });

  it('should re-emit setTimingPlan from timing plan panel', () => {
    component.screen = createScreen();
    fixture.detectChanges();

    const emitSpy = vi.spyOn(component.setTimingPlan, 'emit');

    const timingPlanPanel = fixture.debugElement.query(
      By.directive(TimingPlanPanelComponent)
    ).componentInstance as TimingPlanPanelComponent;

    timingPlanPanel.setTimingPlan.emit({
      screenId: 'SAL1',
      introStartAt: '2026-06-21T15:45:00Z',
      publicStartAt: '2026-06-21T16:00:00Z',
      autoStartEnabled: true
    });

    expect(emitSpy).toHaveBeenCalledWith({
      screenId: 'SAL1',
      introStartAt: '2026-06-21T15:45:00Z',
      publicStartAt: '2026-06-21T16:00:00Z',
      autoStartEnabled: true
    });
  });

  function createScreen(overrides: Partial<ScreenView> = {}): ScreenView {
    return {
      screenId: 'SAL1',
      runtime: {
        screenId: 'SAL1',
        snapshot: {
          screenId: 'SAL1',
          connectivity: 'CONNECTED',
          operational: 'FEATURE',
          schedulerRunning: true,
          currentContentTitle: 'SomeFilm_FEA_01',
          currentContentKind: 'Feature',
          showStatus: 'PLAYING',
          lastError: null,
          observedAt: '2026-06-21T10:00:00Z'
        },
        supervisedState: 'FEATURE',
        lastActions: [],
        timingPlan: null,
        updatedAt: '2026-06-21T10:00:01Z'
      },
      lastExecutionReport: {
        screenId: 'SAL1',
        requestedActions: [],
        executedActions: [],
        skippedActions: [],
        errors: [],
        executedAt: '2026-06-21T10:00:02Z'
      },
      doorReminder: {
        offsetSeconds: 120,
        secondsUntil: 65,
        triggered: false
      },
      ...overrides
    };
  }
});
