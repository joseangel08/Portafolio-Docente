import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVisualizarHistorialActividadesAsignadasComponent } from './modal-visualizar-historial-actividades-asignadas.component';

describe('ModalVisualizarHistorialActividadesAsignadasComponent', () => {
  let component: ModalVisualizarHistorialActividadesAsignadasComponent;
  let fixture: ComponentFixture<ModalVisualizarHistorialActividadesAsignadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalVisualizarHistorialActividadesAsignadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVisualizarHistorialActividadesAsignadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
