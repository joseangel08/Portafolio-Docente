import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVisualizarActividadesAsignadasComponent } from './modal-visualizar-actividades-asignadas.component';

describe('ModalVisualizarActividadesAsignadasComponent', () => {
  let component: ModalVisualizarActividadesAsignadasComponent;
  let fixture: ComponentFixture<ModalVisualizarActividadesAsignadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalVisualizarActividadesAsignadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVisualizarActividadesAsignadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
