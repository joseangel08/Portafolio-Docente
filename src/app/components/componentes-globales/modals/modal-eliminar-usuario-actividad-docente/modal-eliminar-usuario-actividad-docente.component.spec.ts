import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEliminarUsuarioActividadDocenteComponent } from './modal-eliminar-usuario-actividad-docente.component';

describe('ModalEliminarUsuarioActividadDocenteComponent', () => {
  let component: ModalEliminarUsuarioActividadDocenteComponent;
  let fixture: ComponentFixture<ModalEliminarUsuarioActividadDocenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEliminarUsuarioActividadDocenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEliminarUsuarioActividadDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
