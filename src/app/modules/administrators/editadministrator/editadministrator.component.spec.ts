import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditadministratorComponent } from './editadministrator.component';

describe('EditadministratorComponent', () => {
  let component: EditadministratorComponent;
  let fixture: ComponentFixture<EditadministratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditadministratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditadministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
