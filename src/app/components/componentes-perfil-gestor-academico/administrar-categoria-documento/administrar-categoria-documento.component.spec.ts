import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarCategoriaDocumentoComponent } from './administrar-categoria-documento.component';

describe('AdministrarCategoriaDocumentoComponent', () => {
  let component: AdministrarCategoriaDocumentoComponent;
  let fixture: ComponentFixture<AdministrarCategoriaDocumentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarCategoriaDocumentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarCategoriaDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
