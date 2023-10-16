import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEliminarRolesUsuarioComponent } from './modal-eliminar-roles-usuario.component';

describe('ModalEliminarRolesUsuarioComponent', () => {
  let component: ModalEliminarRolesUsuarioComponent;
  let fixture: ComponentFixture<ModalEliminarRolesUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEliminarRolesUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEliminarRolesUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
