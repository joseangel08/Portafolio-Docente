import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalModificarDocenteComponent } from './modal-modificar-docente.component';

describe('ModalModificarDocenteComponent', () => {
  let component: ModalModificarDocenteComponent;
  let fixture: ComponentFixture<ModalModificarDocenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalModificarDocenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalModificarDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
