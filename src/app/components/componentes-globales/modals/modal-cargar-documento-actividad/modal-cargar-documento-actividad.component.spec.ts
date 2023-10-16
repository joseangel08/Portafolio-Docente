import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCargarDocumentoActividadComponent } from './modal-cargar-documento-actividad.component';

describe('ModalCargarDocumentoActividadComponent', () => {
  let component: ModalCargarDocumentoActividadComponent;
  let fixture: ComponentFixture<ModalCargarDocumentoActividadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCargarDocumentoActividadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCargarDocumentoActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
