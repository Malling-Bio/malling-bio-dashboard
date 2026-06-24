import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {beforeEach, describe, expect, it, vi} from 'vitest';

import {TimingPlanPanelComponent} from './timing-plan-panel.component';

describe('TimingPlanPanelComponent', () => {
  let component: TimingPlanPanelComponent;
  let fixture: ComponentFixture<TimingPlanPanelComponent>;

  function setInputValue(
    input: HTMLInputElement,
    value: string,
    eventName: 'input' | 'change' = 'input'
  ): void {
    input.value = value;
    input.dispatchEvent(new Event(eventName));
  }

  function setCheckboxValue(input: HTMLInputElement, checked: boolean): void {
    input.checked = checked;
    input.dispatchEvent(new Event('change'));
  }

  function fillValidForm(): void {
    const dateInputs = fixture.debugElement.queryAll(
      By.css('input[type="datetime-local"]')
    );

    expect(dateInputs.length).toBe(2);

    const introStartInput = dateInputs[0].nativeElement as HTMLInputElement;
    const publicStartInput = dateInputs[1].nativeElement as HTMLInputElement;

    setInputValue(introStartInput, '2026-06-21T17:45');
    setInputValue(publicStartInput, '2026-06-21T18:00');

    const checkboxDe = fixture.debugElement.query(By.css('input[type="checkbox"]'));
    if (checkboxDe) {
      setCheckboxValue(checkboxDe.nativeElement as HTMLInputElement, true);
    }

    fixture.detectChanges();
  }

  function getSubmitButton(): HTMLButtonElement {
    const buttonDe = fixture.debugElement.query(By.css('button[type="submit"], button'));
    expect(buttonDe).not.toBeNull();
    return buttonDe.nativeElement as HTMLButtonElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimingPlanPanelComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TimingPlanPanelComponent);
    component = fixture.componentInstance;
    component.screenId = 'SCREEN_1';
    component.busy = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render two datetime inputs', () => {
    const dateInputs = fixture.debugElement.queryAll(
      By.css('input[type="datetime-local"]')
    );

    expect(dateInputs.length).toBe(2);
  });

  it('should emit setTimingPlan with ISO values on submit', () => {
    const emitSpy = vi.spyOn(component.setTimingPlan, 'emit');

    fillValidForm();
    component.onSubmit();

    expect(emitSpy).toHaveBeenCalledTimes(1);

    const payload = emitSpy.mock.calls[0][0] as {
      introStartAt: string;
      publicStartAt: string;
      autoStartEnabled: boolean;
    };

    expect(payload.introStartAt).toBe('2026-06-21T15:45:00Z');
    expect(payload.publicStartAt).toBe('2026-06-21T16:00:00Z');
    expect(payload.autoStartEnabled).toBe(true);
  });

  it('should not emit setTimingPlan when required values are missing', () => {
    const emitSpy = vi.spyOn(component.setTimingPlan, 'emit');

    component.onSubmit();

    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should disable submit button when busy is true', async () => {
    component.introStartLocal = '2026-06-21T17:45';
    component.publicStartLocal = '2026-06-21T18:00';
    fixture.detectChanges();

    fixture.componentRef.setInput('busy', true);
    await fixture.whenStable();
    fixture.detectChanges();

    const submitButton = getSubmitButton();

    expect(component.canSubmit).toBe(false);
    expect(submitButton.disabled).toBe(true);
  });

  it('should enable submit button when busy is false and form is valid', async () => {
    fillValidForm();
    await fixture.whenStable();
    fixture.detectChanges();

    fixture.componentRef.setInput('busy', false);
    await fixture.whenStable();
    fixture.detectChanges();

    const submitButton = getSubmitButton();

    expect(component.canSubmit).toBe(true);
    expect(submitButton.disabled).toBe(false);
  });

  it('should render active timing plan when available', () => {
    component.timingPlan = {
      screenId: 'SCREEN_1',
      introStartAt: '2026-06-21T17:45:00Z',
      publicStartAt: '2026-06-21T18:00:00Z',
      autoStartEnabled: true
    };

    fixture.detectChanges();

    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';

    expect(text).toContain('Active timing plan');
    expect(text).toContain('21/06/2026 19.45');
    expect(text).toContain('21/06/2026 20.00');
    expect(text).toContain('Enabled');
  });
});
