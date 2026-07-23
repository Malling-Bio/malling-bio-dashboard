import { Routes } from '@angular/router';
import { LandingPageComponent } from './features/landing/landing-page.component';
import { DashboardPageComponent } from './features/dashboard/dashboard-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    title: 'Malling Bio drift',
  },
  {
    path: 'operations',
    component: DashboardPageComponent,
    title: 'Afvikling af dagens program',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
