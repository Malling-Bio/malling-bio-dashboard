import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type ScreenAvailability = 'online' | 'offline' | 'unknown';

interface ScheduledShowView {
  startTime: string;
  title: string;
}

interface ScreenOverviewView {
  screenName: string;
  availability: ScreenAvailability;
  imsStatusText: string;
  scheduleStatusText: string;
  scheduledShows: ScheduledShowView[] | null;
}

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  readonly lastUpdated = new Date();

  readonly looptimeMinutes = 10;

  readonly screens: ScreenOverviewView[] = [
    {
      screenName: 'Sal 1',
      availability: 'offline',
      imsStatusText: 'IMS kan ikke nås',
      scheduleStatusText: 'Ikke tilgængeligt',
      scheduledShows: null,
    },
    {
      screenName: 'Sal 2',
      availability: 'offline',
      imsStatusText: 'IMS kan ikke nås',
      scheduleStatusText: 'Ikke tilgængeligt',
      scheduledShows: null,
    },
  ];

  get onlineScreenCount(): number {
    return this.screens.filter((screen) => screen.availability === 'online').length;
  }

  get overallStatusText(): string {
    if (this.onlineScreenCount === 2) {
      return 'Begge sale er online';
    }

    if (this.onlineScreenCount === 1) {
      return 'Én sal er online';
    }

    return 'Salene er slukkede eller utilgængelige';
  }

  get overallStatusClass(): string {
    if (this.onlineScreenCount === 2) {
      return 'status-good';
    }

    if (this.onlineScreenCount === 1) {
      return 'status-warning';
    }

    return 'status-muted';
  }

  get todayLabel(): string {
    return new Intl.DateTimeFormat('da-DK', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date());
  }

  get lastUpdatedLabel(): string {
    return new Intl.DateTimeFormat('da-DK', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(this.lastUpdated);
  }

  screenStatusClass(screen: ScreenOverviewView): string {
    switch (screen.availability) {
      case 'online':
        return 'status-good';
      case 'offline':
        return 'status-muted';
      default:
        return 'status-warning';
    }
  }

  screenStatusText(screen: ScreenOverviewView): string {
    switch (screen.availability) {
      case 'online':
        return 'Online';
      case 'offline':
        return 'Slukket eller utilgængelig';
      default:
        return 'Ukendt';
    }
  }
}
