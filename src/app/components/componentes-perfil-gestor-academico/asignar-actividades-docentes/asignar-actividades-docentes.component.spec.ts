import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarActividadesDocentesComponent } from './asignar-actividades-docentes.component';

describe('AsignarActividadesDocentesComponent', () => {
  let component: AsignarActividadesDocentesComponent;
  let fixture: ComponentFixture<AsignarActividadesDocentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarActividadesDocentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarActividadesDocentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
