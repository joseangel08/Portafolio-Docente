import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCargarDocumentoComponent } from './modal-cargar-documento.component';

describe('ModalCargarDocumentoComponent', () => {
  let component: ModalCargarDocumentoComponent;
  let fixture: ComponentFixture<ModalCargarDocumentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCargarDocumentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCargarDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
