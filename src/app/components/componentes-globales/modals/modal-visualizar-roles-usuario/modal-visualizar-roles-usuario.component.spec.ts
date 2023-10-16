import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVisualizarRolesUsuarioComponent } from './modal-visualizar-roles-usuario.component';

describe('ModalVisualizarRolesUsuarioComponent', () => {
  let component: ModalVisualizarRolesUsuarioComponent;
  let fixture: ComponentFixture<ModalVisualizarRolesUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalVisualizarRolesUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVisualizarRolesUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
