import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {interval, Subscription} from 'rxjs';

import {OrchestratorApiService} from '../../core/api/orchestrator-api.service';
import {AppMode} from '../../core/models/app-mode';
import {ScreenView} from '../../core/models/screen-view';
import {screenMapToList} from '../../shared/utils/screen-map.util';
import {AppModeBannerComponent} from './components/app-mode-banner/app-mode-banner.component';
import {ScreenCardComponent} from './components/screen-card/screen-card.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [AppModeBannerComponent, ScreenCardComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  private readonly api = inject(OrchestratorApiService);
  private pollingSub?: Subscription;

  readonly appMode = signal<AppMode | null>(null);
  readonly screens = signal<ScreenView[]>([]);
  readonly loading = signal<boolean>(false);
  readonly busy = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  readonly simulationToolsOpen = signal<boolean>(false);

  ngOnInit(): void {
    this.loadDashboard(true);

    this.pollingSub = interval(2000).subscribe(() => {
      if (!this.busy()) {
        this.loadDashboard(false);
      }
    });
  }

  ngOnDestroy(): void {
    this.pollingSub?.unsubscribe();
  }

  toggleSimulationTools(): void {
    this.simulationToolsOpen.update(open => !open);
  }

  loadDashboard(showLoading: boolean): void {
    if (showLoading) {
      this.loading.set(true);
      this.error.set(null);
    }

    let appModeLoaded = false;
    let screensLoaded = false;

    const finishIfDone = () => {
      if (appModeLoaded && screensLoaded && showLoading) {
        this.loading.set(false);
      }
    };

    this.api.getAppMode().subscribe({
      next: (response) => {
        this.appMode.set(response.mode);
        appModeLoaded = true;
        finishIfDone();
      },
      error: (err) => {
        console.error('Failed to load app mode', err);
        this.error.set('Kunne ikke hente app mode');
        if (showLoading) {
          this.loading.set(false);
        }
      }
    });

    this.api.getScreens().subscribe({
      next: (screenMap) => {
        this.screens.set(screenMapToList(screenMap));
        screensLoaded = true;
        finishIfDone();
      },
      error: (err) => {
        console.error('Failed to load screens', err);
        this.error.set('Kunne ikke hente skærmstatus');
        if (showLoading) {
          this.loading.set(false);
        }
      }
    });
  }

  changeAppMode(mode: AppMode): void {
    this.busy.set(true);
    this.error.set(null);

    this.api.setAppMode(mode).subscribe({
      next: () => {
        this.loadDashboard(false);
        this.busy.set(false);
      },
      error: (err) => {
        console.error('Failed to set app mode', err);
        this.error.set(`Kunne ikke skifte app mode til ${mode}`);
        this.busy.set(false);
      }
    });
  }

  startShow(screenId: string): void {
    this.busy.set(true);
    this.error.set(null);

    this.api.sendScreenEvent(screenId, 'MANUAL_START_REQUESTED').subscribe({
      next: () => {
        this.loadDashboard(false);
        this.busy.set(false);
      },
      error: (err) => {
        console.error('Failed to start show', err);
        this.error.set(`Kunne ikke starte show for ${screenId}`);
        this.busy.set(false);
      }
    });
  }

  setTimingPlan(payload: {
    screenId: string;
    introStartAt: string;
    publicStartAt: string;
    autoStartEnabled: boolean;
  }): void {
    this.busy.set(true);
    this.error.set(null);

    this.api.setTimingPlan(payload.screenId, {
      introStartAt: payload.introStartAt,
      publicStartAt: payload.publicStartAt,
      autoStartEnabled: payload.autoStartEnabled
    }).subscribe({
      next: () => {
        this.loadDashboard(false);
        this.busy.set(false);
      },
      error: (err) => {
        console.error('Failed to set timing plan', err);
        this.error.set(`Kunne ikke sætte timing plan for ${payload.screenId}`);
        this.busy.set(false);
      }
    });
  }
}
