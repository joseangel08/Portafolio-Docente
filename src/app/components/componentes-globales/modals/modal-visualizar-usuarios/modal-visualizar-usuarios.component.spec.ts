import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVisualizarUsuariosComponent } from './modal-visualizar-usuarios.component';

describe('ModalVisualizarUsuariosComponent', () => {
  let component: ModalVisualizarUsuariosComponent;
  let fixture: ComponentFixture<ModalVisualizarUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalVisualizarUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVisualizarUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
