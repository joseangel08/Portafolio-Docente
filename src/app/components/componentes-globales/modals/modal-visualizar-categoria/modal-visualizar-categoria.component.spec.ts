import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVisualizarCategoriaComponent } from './modal-visualizar-categoria.component';

describe('ModalVisualizarCategoriaComponent', () => {
  let component: ModalVisualizarCategoriaComponent;
  let fixture: ComponentFixture<ModalVisualizarCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalVisualizarCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVisualizarCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
