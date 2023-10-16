import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarUsuariosSistemaComponent } from './administrar-usuarios-sistema.component';

describe('CrearUsuarioSistemaComponent', () => {
  let component: AdministrarUsuariosSistemaComponent;
  let fixture: ComponentFixture<AdministrarUsuariosSistemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdministrarUsuariosSistemaComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarUsuariosSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
