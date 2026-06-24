import {ComponentFixture, TestBed} from '@angular/core/testing';
import {vi} from 'vitest';

import {ScreenActionsPanelComponent} from './screen-actions-panel.component';

describe('ScreenActionsPanelComponent', () => {
  let component: ScreenActionsPanelComponent;
  let fixture: ComponentFixture<ScreenActionsPanelComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenActionsPanelComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ScreenActionsPanelComponent);
    component = fixture.componentInstance;
    host = fixture.nativeElement as HTMLElement;

    component.screenId = 'SAL1';
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should have default selected event and state', () => {
    fixture.detectChanges();

    expect(component.selectedEvent).toBe('PUBLIC_START_REACHED');
    expect(component.selectedState).toBe('INTRO_LOOP');
  });

  it('should render event and state selects', () => {
    fixture.detectChanges();

    const selects = host.querySelectorAll('select');

    expect(selects.length).toBe(2);
    expect(host.textContent).toContain('Send event');
    expect(host.textContent).toContain('Set supervisor state');
  });

  it('should emit sendEvent with selected event and screenId', () => {
    fixture.detectChanges();

    const spy = vi.fn();
    component.sendEvent.subscribe(spy);

    component.selectedEvent = 'SHOW_FINISHED';
    component.onSendEvent();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      screenId: 'SAL1',
      event: 'SHOW_FINISHED'
    });
  });

  it('should emit setSupervisorState with selected state and screenId', () => {
    fixture.detectChanges();

    const spy = vi.fn();
    component.setSupervisorState.subscribe(spy);

    component.selectedState = 'FEATURE';
    component.onSetSupervisorState();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      screenId: 'SAL1',
      state: 'FEATURE'
    });
  });

  it('should disable all controls when busy is true', async () => {
    component.busy = true;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const selects = Array.from(host.querySelectorAll('select')) as HTMLSelectElement[];
    const buttons = Array.from(host.querySelectorAll('button')) as HTMLButtonElement[];

    expect(selects.length).toBe(2);
    expect(buttons.length).toBe(2);

    expect(selects[0].disabled).toBe(true);
    expect(selects[1].disabled).toBe(true);
    expect(buttons[0].disabled).toBe(true);
    expect(buttons[1].disabled).toBe(true);
  });

  it('should enable all controls when busy is false', async () => {
    component.busy = false;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const selects = Array.from(host.querySelectorAll('select')) as HTMLSelectElement[];
    const buttons = Array.from(host.querySelectorAll('button')) as HTMLButtonElement[];

    expect(selects.length).toBe(2);
    expect(buttons.length).toBe(2);

    expect(selects[0].disabled).toBe(false);
    expect(selects[1].disabled).toBe(false);
    expect(buttons[0].disabled).toBe(false);
    expect(buttons[1].disabled).toBe(false);
  });

  it('should contain curated manual events only', () => {
    fixture.detectChanges();

    const eventValues = component.availableEvents.map(e => e.value);

    expect(eventValues).toContain('NEXT_SHOW_WINDOW_OPENED');
    expect(eventValues).toContain('PUBLIC_START_REACHED');
    expect(eventValues).toContain('DOOR_REMINDER_REACHED');
    expect(eventValues).toContain('SHOW_FINISHED');

    expect(eventValues).not.toContain('CURRENT_CONTENT_IS_TRAILER');
    expect(eventValues).not.toContain('CURRENT_CONTENT_IS_FEATURE');
    expect(eventValues).not.toContain('SHOW_PAUSED_AFTER_START');
  });
});
