import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSeleccionarPeriodoAcademicoComponent } from './modal-seleccionar-periodo-academico.component';

describe('ModalSeleccionarPeriodoAcademicoComponent', () => {
  let component: ModalSeleccionarPeriodoAcademicoComponent;
  let fixture: ComponentFixture<ModalSeleccionarPeriodoAcademicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSeleccionarPeriodoAcademicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSeleccionarPeriodoAcademicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
