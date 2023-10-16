import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCrearUsuarioComponent } from './modal-crear-usuario.component';

describe('ModalCrearUsuarioComponent', () => {
  let component: ModalCrearUsuarioComponent;
  let fixture: ComponentFixture<ModalCrearUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCrearUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCrearUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
