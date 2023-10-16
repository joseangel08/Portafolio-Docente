import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoDatosUsuarioComponent } from './ingreso-datos-usuario.component';

describe('IngresoDatosUsuarioComponent', () => {
  let component: IngresoDatosUsuarioComponent;
  let fixture: ComponentFixture<IngresoDatosUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresoDatosUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoDatosUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
