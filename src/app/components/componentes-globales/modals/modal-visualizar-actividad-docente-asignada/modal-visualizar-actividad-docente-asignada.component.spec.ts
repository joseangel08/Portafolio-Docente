import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVisualizarActividadDocenteAsignadaComponent } from './modal-visualizar-actividad-docente-asignada.component';

describe('ModalVisualizarActividadDocenteAsignadaComponent', () => {
  let component: ModalVisualizarActividadDocenteAsignadaComponent;
  let fixture: ComponentFixture<ModalVisualizarActividadDocenteAsignadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalVisualizarActividadDocenteAsignadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVisualizarActividadDocenteAsignadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
