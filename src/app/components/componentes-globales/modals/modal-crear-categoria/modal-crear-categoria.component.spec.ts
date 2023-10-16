import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCrearCategoriaComponent } from './modal-crear-categoria.component';

describe('ModalCrearCategoriaComponent', () => {
  let component: ModalCrearCategoriaComponent;
  let fixture: ComponentFixture<ModalCrearCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCrearCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCrearCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
