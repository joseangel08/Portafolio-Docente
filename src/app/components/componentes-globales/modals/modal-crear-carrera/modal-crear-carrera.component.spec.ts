import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCrearCarreraComponent } from './modal-crear-carrera.component';

describe('ModalCrearCarreraComponent', () => {
  let component: ModalCrearCarreraComponent;
  let fixture: ComponentFixture<ModalCrearCarreraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCrearCarreraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCrearCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
