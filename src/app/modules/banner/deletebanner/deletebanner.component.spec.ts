import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletebannerComponent } from './deletebanner.component';

describe('DeletebannerComponent', () => {
  let component: DeletebannerComponent;
  let fixture: ComponentFixture<DeletebannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletebannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletebannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
