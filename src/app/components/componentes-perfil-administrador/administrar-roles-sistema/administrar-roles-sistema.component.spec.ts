import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarRolesSistemaComponent } from './administrar-roles-sistema.component';

describe('ListarRolesComponent', () => {
  let component: AdministrarRolesSistemaComponent;
  let fixture: ComponentFixture<AdministrarRolesSistemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarRolesSistemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarRolesSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
