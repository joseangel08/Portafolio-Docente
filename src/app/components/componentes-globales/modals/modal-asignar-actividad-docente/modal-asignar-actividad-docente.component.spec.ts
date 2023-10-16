import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAsignarActividadDocenteComponent } from './modal-asignar-actividad-docente.component';

describe('ModalAsignarActividadDocenteComponent', () => {
  let component: ModalAsignarActividadDocenteComponent;
  let fixture: ComponentFixture<ModalAsignarActividadDocenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAsignarActividadDocenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAsignarActividadDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
