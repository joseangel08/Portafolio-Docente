import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalModificarActividadDocenteComponent } from './modal-modificar-actividad-docente.component';

describe('ModalModificarActividadDocenteComponent', () => {
  let component: ModalModificarActividadDocenteComponent;
  let fixture: ComponentFixture<ModalModificarActividadDocenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalModificarActividadDocenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalModificarActividadDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
