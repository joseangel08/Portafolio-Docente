import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarPeriodosAcademicosComponent } from './administrar-periodos-academicos.component';

describe('AdministrarPeriodosAcademicosComponent', () => {
  let component: AdministrarPeriodosAcademicosComponent;
  let fixture: ComponentFixture<AdministrarPeriodosAcademicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarPeriodosAcademicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarPeriodosAcademicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
