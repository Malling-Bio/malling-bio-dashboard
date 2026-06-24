import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SnapshotPanelComponent} from './snapshot-panel.component';
import {ScreenRuntimeStatus} from '../../../../core/models/screen-runtime-status';

describe('SnapshotPanelComponent', () => {
  let component: SnapshotPanelComponent;
  let fixture: ComponentFixture<SnapshotPanelComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnapshotPanelComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SnapshotPanelComponent);
    component = fixture.componentInstance;
    host = fixture.nativeElement as HTMLElement;
  });


  it('should create', () => {
    component.runtime = createRuntime();

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should render connectivity', () => {
    component.runtime = createRuntime({
      snapshot: {
        ...createRuntime().snapshot,
        connectivity: 'CONNECTED'
      }
    });

    fixture.detectChanges();

    expect(host.textContent).toContain('IMS connectivity');
    expect(host.textContent).toContain('CONNECTED');
  });

  it('should render scheduler as Running when schedulerRunning is true', () => {
    component.runtime = createRuntime({
      snapshot: {
        ...createRuntime().snapshot,
        schedulerRunning: true
      }
    });

    fixture.detectChanges();

    expect(host.textContent).toContain('IMS scheduler mode');
    expect(host.textContent).toContain('Running');
  });

  it('should render scheduler as Stopped when schedulerRunning is false', () => {
    component.runtime = createRuntime({
      snapshot: {
        ...createRuntime().snapshot,
        schedulerRunning: false
      }
    });

    fixture.detectChanges();

    expect(host.textContent).toContain('IMS scheduler mode');
    expect(host.textContent).toContain('Stopped');
  });

  it('should render current content title when present', () => {
    component.runtime = createRuntime({
      snapshot: {
        ...createRuntime().snapshot,
        currentContentTitle: 'SomeFilm_FEA_01'
      }
    });

    fixture.detectChanges();

    expect(host.textContent).toContain('IMS current content');
    expect(host.textContent).toContain('SomeFilm_FEA_01');
  });

  it('should render "-" when current content title is null', () => {
    component.runtime = createRuntime({
      snapshot: {
        ...createRuntime().snapshot,
        currentContentTitle: null
      }
    });

    fixture.detectChanges();

    expect(host.textContent).toContain('IMS current content');
    expect(host.textContent).toContain('-');
  });

  it('should render show status', () => {
    component.runtime = createRuntime({
      snapshot: {
        ...createRuntime().snapshot,
        showStatus: 'PLAYING'
      }
    });

    fixture.detectChanges();

    expect(host.textContent).toContain('IMS show status');
    expect(host.textContent).toContain('PLAYING');
  });

  it('should render updated timestamp', () => {
    component.runtime = createRuntime({
      updatedAt: '2026-06-21T10:30:00Z'
    });

    fixture.detectChanges();

    expect(host.textContent).toContain('IMS updated');
    expect(host.textContent).toContain('2026-06-21T10:30:00Z');
  });

  function createRuntime(
    overrides: Partial<ScreenRuntimeStatus> = {}
  ): ScreenRuntimeStatus {
    return {
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
      updatedAt: '2026-06-21T10:00:01Z',
      ...overrides
    };
  }
});
