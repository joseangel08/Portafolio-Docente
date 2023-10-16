import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarDocumentoComponent } from './visualizar-documento.component';

describe('VisualizarDocumentoComponent', () => {
  let component: VisualizarDocumentoComponent;
  let fixture: ComponentFixture<VisualizarDocumentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarDocumentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
