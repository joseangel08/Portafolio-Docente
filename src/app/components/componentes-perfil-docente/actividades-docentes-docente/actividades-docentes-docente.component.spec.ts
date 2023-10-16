import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesDocentesDocenteComponent } from './actividades-docentes-docente.component';

describe('ActividadesDocentesDocenteComponent', () => {
  let component: ActividadesDocentesDocenteComponent;
  let fixture: ComponentFixture<ActividadesDocentesDocenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActividadesDocentesDocenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadesDocentesDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
