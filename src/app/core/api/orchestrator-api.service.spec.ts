import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { OrchestratorApiService } from './orchestrator-api.service';
import { ScreenView } from '../models/screen-view';

describe('OrchestratorApiService', () => {
  let service: OrchestratorApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrchestratorApiService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(OrchestratorApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch app mode', () => {
    let actual: { mode: string } | undefined;

    service.getAppMode().subscribe(response => {
      actual = response;
    });

    const req = httpMock.expectOne(r => r.url.endsWith('/api/app-mode'));
    expect(req.request.method).toBe('GET');

    req.flush({ mode: 'AUTO' });

    expect(actual).toEqual({ mode: 'AUTO' });
  });

  it('should set app mode', () => {
    service.setAppMode('MANUAL').subscribe();

    const req = httpMock.expectOne(r => r.url.endsWith('/api/app-mode'));
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ mode: 'MANUAL' });

    req.flush({});
  });

  it('should fetch screens', () => {
    let actual: Record<string, ScreenView> | undefined;

    service.getScreens().subscribe(response => {
      actual = response;
    });

    const req = httpMock.expectOne(r => r.url.endsWith('/api/screens'));
    expect(req.request.method).toBe('GET');

    req.flush({
      SAL1: {
        screenId: 'SAL1',
        runtime: {
          screenId: 'SAL1',
          snapshot: {
            screenId: 'SAL1',
            connectivity: 'CONNECTED',
            operational: 'IDLE',
            schedulerRunning: false,
            currentContentTitle: 'INTRO_LOOP',
            currentContentKind: 'Intro',
            showStatus: 'IDLE',
            lastError: null,
            observedAt: '2026-06-21T10:00:00Z'
          },
          supervisedState: 'IDLE',
          lastActions: [],
          timingPlan: null,
          updatedAt: '2026-06-21T10:00:01Z'
        },
        lastExecutionReport: null,
        doorReminder: {
          offsetSeconds: 120,
          secondsUntil: 65,
          triggered: false
        }
      }
    });

    expect(actual?.['SAL1'].screenId).toBe('SAL1');
    expect(actual?.['SAL1'].runtime.supervisedState).toBe('IDLE');
    expect(actual?.['SAL1'].runtime.timingPlan).toBeNull();
  });

  it('should send screen event', () => {
    service.sendScreenEvent('SAL1', 'PUBLIC_START_REACHED').subscribe();

    const req = httpMock.expectOne(r => r.url.endsWith('/api/screens/SAL1/events'));
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ event: 'PUBLIC_START_REACHED' });

    req.flush({});
  });

  it('should set supervisor state', () => {
    service.setSupervisorState('SAL1', 'FEATURE').subscribe();

    const req = httpMock.expectOne(r => r.url.endsWith('/api/dev/supervisor/SAL1/state'));
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ state: 'FEATURE' });

    req.flush({});
  });

  it('should set timing plan', () => {
    service.setTimingPlan('SAL1', {
      introStartAt: '2026-06-21T17:45:00Z',
      publicStartAt: '2026-06-21T18:00:00Z',
      autoStartEnabled: true
    }).subscribe();

    const req = httpMock.expectOne(r => r.url.endsWith('/api/dev/timing/SAL1/plan'));
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      introStartAt: '2026-06-21T17:45:00Z',
      publicStartAt: '2026-06-21T18:00:00Z',
      autoStartEnabled: true
    });

    req.flush({});
  });
});
