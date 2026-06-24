import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AppModeBannerComponent} from './app-mode-banner.component';

describe('AppModeBanner', () => {
  let component: AppModeBannerComponent;
  let fixture: ComponentFixture<AppModeBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModeBannerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppModeBannerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
