import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarDucumentoGeneralComponent } from './validar-ducumento-general.component';

describe('ValidarDucumentoGeneralComponent', () => {
  let component: ValidarDucumentoGeneralComponent;
  let fixture: ComponentFixture<ValidarDucumentoGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidarDucumentoGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarDucumentoGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
