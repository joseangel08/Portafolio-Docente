import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalModificarUsuariosComponent } from './modal-modificar-usuarios.component';

describe('ModalModificarUsuariosComponent', () => {
  let component: ModalModificarUsuariosComponent;
  let fixture: ComponentFixture<ModalModificarUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalModificarUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalModificarUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
