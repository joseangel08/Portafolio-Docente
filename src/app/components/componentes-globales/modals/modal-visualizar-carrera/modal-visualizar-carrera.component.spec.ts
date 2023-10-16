import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVisualizarCarreraComponent } from './modal-visualizar-carrera.component';

describe('ModalVisualizarCarreraComponent', () => {
  let component: ModalVisualizarCarreraComponent;
  let fixture: ComponentFixture<ModalVisualizarCarreraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalVisualizarCarreraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVisualizarCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
