import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletesubcategoryComponent } from './deletesubcategory.component';

describe('DeletesubcategoryComponent', () => {
  let component: DeletesubcategoryComponent;
  let fixture: ComponentFixture<DeletesubcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletesubcategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletesubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
