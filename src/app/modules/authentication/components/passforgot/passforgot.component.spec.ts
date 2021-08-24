import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassforgotComponent } from './passforgot.component';

describe('PassforgotComponent', () => {
  let component: PassforgotComponent;
  let fixture: ComponentFixture<PassforgotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassforgotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassforgotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
