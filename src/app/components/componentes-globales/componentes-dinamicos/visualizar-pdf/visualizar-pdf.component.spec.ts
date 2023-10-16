import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarPdfComponent } from './visualizar-pdf.component';

describe('CargarDocumentoComponent', () => {
  let component: VisualizarPdfComponent;
  let fixture: ComponentFixture<VisualizarPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
