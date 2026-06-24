import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DoorReminderPanelComponent} from './door-reminder-panel.component';

describe('DoorReminderPanelComponent', () => {
  let component: DoorReminderPanelComponent;
  let fixture: ComponentFixture<DoorReminderPanelComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoorReminderPanelComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DoorReminderPanelComponent);
    component = fixture.componentInstance;
    host = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    component.doorReminder = {
      offsetSeconds: null,
      secondsUntil: null,
      triggered: false
    };

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should show "-" when offsetSeconds is null', () => {
    component.doorReminder = {
      offsetSeconds: null,
      secondsUntil: 120,
      triggered: false
    };

    fixture.detectChanges();

    expect(host.textContent).toContain('Door reminder offset');
    expect(host.textContent).toContain('-');
  });

  it('should show "-" when secondsUntil is null', () => {
    component.doorReminder = {
      offsetSeconds: 5220,
      secondsUntil: null,
      triggered: false
    };

    fixture.detectChanges();

    expect(host.textContent).toContain('Door reminder countdown');
    expect(host.textContent).toContain('-');
  });

  it('should show offsetSeconds with s suffix', () => {
    component.doorReminder = {
      offsetSeconds: 5220,
      secondsUntil: 4978,
      triggered: false
    };

    fixture.detectChanges();

    expect(host.textContent).toContain('5220s');
  });

  it('should show Waiting when triggered is false', () => {
    component.doorReminder = {
      offsetSeconds: 5220,
      secondsUntil: 4978,
      triggered: false
    };

    fixture.detectChanges();

    expect(host.textContent).toContain('Door reminder status');
    expect(host.textContent).toContain('Waiting');
  });

  it('should show Triggered when triggered is true', () => {
    component.doorReminder = {
      offsetSeconds: 5220,
      secondsUntil: 0,
      triggered: true
    };

    fixture.detectChanges();

    expect(host.textContent).toContain('Door reminder status');
    expect(host.textContent).toContain('Triggered');
  });

  it('should format secondsUntil as mm:ss when under one hour', () => {
    component.doorReminder = {
      offsetSeconds: 120,
      secondsUntil: 65,
      triggered: false
    };

    fixture.detectChanges();

    expect(host.textContent).toContain('1:05');
  });

  it('should format secondsUntil as h:mm:ss when one hour or more', () => {
    component.doorReminder = {
      offsetSeconds: 7200,
      secondsUntil: 3661,
      triggered: false
    };

    fixture.detectChanges();

    expect(host.textContent).toContain('1:01:01');
  });

  it('should clamp negative secondsUntil to 0:00', () => {
    component.doorReminder = {
      offsetSeconds: 100,
      secondsUntil: -10,
      triggered: false
    };

    fixture.detectChanges();

    expect(host.textContent).toContain('0:00');
  });

  it('formatSeconds should return "-" for null', () => {
    expect(component.formatSeconds(null)).toBe('-');
  });

  it('formatSeconds should return mm:ss for short duration', () => {
    expect(component.formatSeconds(125)).toBe('2:05');
  });

  it('formatSeconds should return h:mm:ss for long duration', () => {
    expect(component.formatSeconds(3723)).toBe('1:02:03');
  });
});
