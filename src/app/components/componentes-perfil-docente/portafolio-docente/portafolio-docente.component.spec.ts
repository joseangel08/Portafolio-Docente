import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortafolioDocenteComponent } from './portafolio-docente.component';

describe('PortafolioDocenteComponent', () => {
  let component: PortafolioDocenteComponent;
  let fixture: ComponentFixture<PortafolioDocenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortafolioDocenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortafolioDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
