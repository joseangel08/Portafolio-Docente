import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVisualizarHistorialRolesComponent } from './modal-visualizar-historial-roles.component';

describe('ModalVisualizarHistorialRolesComponent', () => {
  let component: ModalVisualizarHistorialRolesComponent;
  let fixture: ComponentFixture<ModalVisualizarHistorialRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalVisualizarHistorialRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVisualizarHistorialRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
