import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCrearPeriodoAcademicoComponent } from './modal-crear-periodo-academico.component';

describe('ModalCrearPeriodoAcademicoComponent', () => {
  let component: ModalCrearPeriodoAcademicoComponent;
  let fixture: ComponentFixture<ModalCrearPeriodoAcademicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCrearPeriodoAcademicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCrearPeriodoAcademicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
