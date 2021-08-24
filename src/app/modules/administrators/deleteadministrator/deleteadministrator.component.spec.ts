import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteadministratorComponent } from './deleteadministrator.component';

describe('DeleteadministratorComponent', () => {
  let component: DeleteadministratorComponent;
  let fixture: ComponentFixture<DeleteadministratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteadministratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteadministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
