import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaymeetingsComponent } from './todaymeetings.component';

describe('TodaymeetingsComponent', () => {
  let component: TodaymeetingsComponent;
  let fixture: ComponentFixture<TodaymeetingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodaymeetingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaymeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
