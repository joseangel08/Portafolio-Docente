import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalModificarPeriodoAcademicoComponent } from './modal-modificar-periodo-academico.component';

describe('ModalModificarPeriodoAcademicoComponent', () => {
  let component: ModalModificarPeriodoAcademicoComponent;
  let fixture: ComponentFixture<ModalModificarPeriodoAcademicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalModificarPeriodoAcademicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalModificarPeriodoAcademicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
