import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVisualizarActividadDocenteComponent } from './modal-visualizar-actividad-docente.component';

describe('ModalVisualizarActividadDocenteComponent', () => {
  let component: ModalVisualizarActividadDocenteComponent;
  let fixture: ComponentFixture<ModalVisualizarActividadDocenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalVisualizarActividadDocenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVisualizarActividadDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
