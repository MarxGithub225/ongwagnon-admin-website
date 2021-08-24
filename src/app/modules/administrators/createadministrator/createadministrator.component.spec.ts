import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateadministratorComponent } from './createadministrator.component';

describe('CreateadministratorComponent', () => {
  let component: CreateadministratorComponent;
  let fixture: ComponentFixture<CreateadministratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateadministratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateadministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
