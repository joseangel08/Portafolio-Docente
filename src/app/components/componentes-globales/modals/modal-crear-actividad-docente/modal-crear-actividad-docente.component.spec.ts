import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCrearActividadDocenteComponent } from './modal-crear-actividad-docente.component';

describe('ModalCrearActividadDocenteComponent', () => {
  let component: ModalCrearActividadDocenteComponent;
  let fixture: ComponentFixture<ModalCrearActividadDocenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCrearActividadDocenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCrearActividadDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
