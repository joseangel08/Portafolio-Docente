import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarPortafoliosDocentesComponent } from './administrar-portafolios-docentes.component';

describe('AdministrarPortafoliosDocentesComponent', () => {
  let component: AdministrarPortafoliosDocentesComponent;
  let fixture: ComponentFixture<AdministrarPortafoliosDocentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarPortafoliosDocentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarPortafoliosDocentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
