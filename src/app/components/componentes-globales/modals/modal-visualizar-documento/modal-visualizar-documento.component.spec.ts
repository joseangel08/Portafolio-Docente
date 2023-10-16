import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVisualizarDocumentoComponent } from './modal-visualizar-documento.component';

describe('ModalVisualizarDocumentoComponent', () => {
  let component: ModalVisualizarDocumentoComponent;
  let fixture: ComponentFixture<ModalVisualizarDocumentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalVisualizarDocumentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVisualizarDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
