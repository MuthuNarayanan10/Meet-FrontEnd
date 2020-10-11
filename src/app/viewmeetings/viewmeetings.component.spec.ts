import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmeetingsComponent } from './viewmeetings.component';

describe('ViewmeetingsComponent', () => {
  let component: ViewmeetingsComponent;
  let fixture: ComponentFixture<ViewmeetingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewmeetingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewmeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
