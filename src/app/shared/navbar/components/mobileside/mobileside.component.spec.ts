import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilesideComponent } from './mobileside.component';

describe('MobilesideComponent', () => {
  let component: MobilesideComponent;
  let fixture: ComponentFixture<MobilesideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobilesideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobilesideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
