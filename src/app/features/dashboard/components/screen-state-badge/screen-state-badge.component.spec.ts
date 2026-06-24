import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ScreenStateBadgeComponent} from './screen-state-badge.component';

describe('ScreenStateBadgeComponent', () => {
  let component: ScreenStateBadgeComponent;
  let fixture: ComponentFixture<ScreenStateBadgeComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenStateBadgeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ScreenStateBadgeComponent);
    component = fixture.componentInstance;
    host = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    component.state = 'IDLE';

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should render state text', () => {
    component.state = 'FEATURE';

    fixture.detectChanges();

    expect(host.textContent).toContain('FEATURE');
  });

  it('should apply feature class for FEATURE', () => {
    component.state = 'FEATURE';

    fixture.detectChanges();

    const badge = host.querySelector('.state-badge');
    expect(badge).not.toBeNull();
    expect(badge?.className).toContain('feature');
  });

  it('should apply starting class for STARTING', () => {
    component.state = 'STARTING';

    fixture.detectChanges();

    const badge = host.querySelector('.state-badge');
    expect(badge).not.toBeNull();
    expect(badge?.className).toContain('starting');
  });

  it('should apply starting class for INTRO_LOOP', () => {
    component.state = 'INTRO_LOOP';

    fixture.detectChanges();

    const badge = host.querySelector('.state-badge');
    expect(badge).not.toBeNull();
    expect(badge?.className).toContain('starting');
  });

  it('should apply ending class for ENDING', () => {
    component.state = 'ENDING';

    fixture.detectChanges();

    const badge = host.querySelector('.state-badge');
    expect(badge).not.toBeNull();
    expect(badge?.className).toContain('ending');
  });

  it('should apply no-connection class for NO_CONNECTION', () => {
    component.state = 'NO_CONNECTION';

    fixture.detectChanges();

    const badge = host.querySelector('.state-badge');
    expect(badge).not.toBeNull();
    expect(badge?.className).toContain('no-connection');
  });

  it('should apply default class for unknown state', () => {
    component.state = 'IDLE';

    fixture.detectChanges();

    const badge = host.querySelector('.state-badge');
    expect(badge).not.toBeNull();
    expect(badge?.className).toContain('default');
  });

  it('toneClass should return feature for FEATURE', () => {
    component.state = 'FEATURE';
    expect(component.toneClass()).toBe('feature');
  });

  it('toneClass should return starting for STARTING', () => {
    component.state = 'STARTING';
    expect(component.toneClass()).toBe('starting');
  });

  it('toneClass should return starting for INTRO_LOOP', () => {
    component.state = 'INTRO_LOOP';
    expect(component.toneClass()).toBe('starting');
  });

  it('toneClass should return ending for ENDING', () => {
    component.state = 'ENDING';
    expect(component.toneClass()).toBe('ending');
  });

  it('toneClass should return no-connection for NO_CONNECTION', () => {
    component.state = 'NO_CONNECTION';
    expect(component.toneClass()).toBe('no-connection');
  });

  it('toneClass should return default for other states', () => {
    component.state = 'IDLE';
    expect(component.toneClass()).toBe('default');
  });
});
