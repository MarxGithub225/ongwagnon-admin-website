import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilsideComponent } from './profilside.component';

describe('ProfilsideComponent', () => {
  let component: ProfilsideComponent;
  let fixture: ComponentFixture<ProfilsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilsideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
