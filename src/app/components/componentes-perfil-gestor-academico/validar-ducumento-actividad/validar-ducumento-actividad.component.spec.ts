import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarDucumentoActividadComponent } from './validar-ducumento-actividad.component';

describe('ValidarDucumentoActividadComponent', () => {
  let component: ValidarDucumentoActividadComponent;
  let fixture: ComponentFixture<ValidarDucumentoActividadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidarDucumentoActividadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarDucumentoActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
