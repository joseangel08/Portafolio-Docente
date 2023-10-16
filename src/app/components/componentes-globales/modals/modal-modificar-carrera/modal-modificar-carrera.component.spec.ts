import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalModificarCarreraComponent } from './modal-modificar-carrera.component';

describe('ModalModificarCarreraComponent', () => {
  let component: ModalModificarCarreraComponent;
  let fixture: ComponentFixture<ModalModificarCarreraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalModificarCarreraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalModificarCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
