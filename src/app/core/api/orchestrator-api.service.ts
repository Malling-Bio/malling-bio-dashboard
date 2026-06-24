import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {API_BASE_URL} from '../config/api.config';
import {AppMode} from '../models/app-mode';
import {AppModeResponse} from '../models/app-mode-response';
import {ScreenView} from '../models/screen-view';
import {EventRequest} from '../models/event-request';
import {SupervisorStateRequest} from '../models/supervisor-state-request';
import {TimingPlanRequest} from '../models/timing-plan-request';
import {ScreenSplResult} from '../models/screen-spl-result';

@Injectable({
  providedIn: 'root'
})
export class OrchestratorApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = API_BASE_URL;

  // ---------------------------------------------------------------------------
  // App mode
  // ---------------------------------------------------------------------------

  getAppMode(): Observable<AppModeResponse> {
    return this.http.get<AppModeResponse>(`${this.baseUrl}/api/app-mode`);
  }

  setAppMode(mode: AppMode): Observable<AppModeResponse> {
    return this.http.put<AppModeResponse>(`${this.baseUrl}/api/app-mode`, {mode});
  }

  // ---------------------------------------------------------------------------
  // Screens
  // ---------------------------------------------------------------------------

  getScreens(): Observable<Record<string, ScreenView>> {
    return this.http.get<Record<string, ScreenView>>(`${this.baseUrl}/api/screens`);
  }

  sendScreenEvent(screenId: string, event: string): Observable<unknown> {
    const body: EventRequest = {event};
    return this.http.post(`${this.baseUrl}/api/screens/${screenId}/events`, body);
  }

  // ---------------------------------------------------------------------------
  // Dev – supervisor
  // ---------------------------------------------------------------------------

  setSupervisorState(screenId: string, state: string): Observable<unknown> {
    const body: SupervisorStateRequest = {state};
    return this.http.post(`${this.baseUrl}/api/dev/supervisor/${screenId}/state`, body);
  }

  // ---------------------------------------------------------------------------
  // Dev – timing
  // ---------------------------------------------------------------------------

  setTimingPlan(screenId: string, payload: TimingPlanRequest): Observable<unknown> {
    return this.http.post(`${this.baseUrl}/api/dev/timing/${screenId}/plan`, payload);
  }

  // ---------------------------------------------------------------------------
  // Dev – SPL cues
  // ---------------------------------------------------------------------------

  getSplCues(screenId: string): Observable<ScreenSplResult> {
    return this.http.get<ScreenSplResult>(`${this.baseUrl}/api/dev/screens/${screenId}/spl/cues`);
  }

  searchSplCue(screenId: string, text: string): Observable<unknown> {
    return this.http.get(`${this.baseUrl}/api/dev/screens/${screenId}/spl/cues/search`, {
      params: {text}
    });
  }

  getSplCuesForAllScreens(): Observable<Record<string, ScreenSplResult>> {
    return this.http.get<Record<string, ScreenSplResult>>(`${this.baseUrl}/api/dev/screens/spl/cues`);
  }
}
