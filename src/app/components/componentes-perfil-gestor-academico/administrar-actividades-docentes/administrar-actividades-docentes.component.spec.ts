import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarActividadesDocentesComponent } from './administrar-actividades-docentes.component';

describe('AdministrarActividadesDocentesComponent', () => {
  let component: AdministrarActividadesDocentesComponent;
  let fixture: ComponentFixture<AdministrarActividadesDocentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarActividadesDocentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarActividadesDocentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
