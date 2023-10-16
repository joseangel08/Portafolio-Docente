import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalModificarCategoriaComponent } from './modal-modificar-categoria.component';

describe('ModalModificarCategoriaComponent', () => {
  let component: ModalModificarCategoriaComponent;
  let fixture: ComponentFixture<ModalModificarCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalModificarCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalModificarCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
