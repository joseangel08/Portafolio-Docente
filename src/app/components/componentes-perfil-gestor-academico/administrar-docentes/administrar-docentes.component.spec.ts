import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarDocentesComponent } from './administrar-docentes.component';

describe('AdministrarDocentesComponent', () => {
  let component: AdministrarDocentesComponent;
  let fixture: ComponentFixture<AdministrarDocentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarDocentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarDocentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
