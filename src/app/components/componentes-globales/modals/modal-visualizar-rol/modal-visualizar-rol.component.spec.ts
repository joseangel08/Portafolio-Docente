import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVisualizarRolComponent } from './modal-visualizar-rol.component';

describe('ModalVisualizarRolComponent', () => {
  let component: ModalVisualizarRolComponent;
  let fixture: ComponentFixture<ModalVisualizarRolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalVisualizarRolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVisualizarRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
