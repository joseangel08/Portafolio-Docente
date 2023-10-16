import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVisualizarPeriodoAcademicoComponent } from './modal-visualizar-periodo-academico.component';

describe('ModalVisualizarPeriodoAcademicoComponent', () => {
  let component: ModalVisualizarPeriodoAcademicoComponent;
  let fixture: ComponentFixture<ModalVisualizarPeriodoAcademicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalVisualizarPeriodoAcademicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVisualizarPeriodoAcademicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
