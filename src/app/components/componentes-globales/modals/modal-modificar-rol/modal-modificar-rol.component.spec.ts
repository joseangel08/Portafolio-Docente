import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalModificarRolComponent } from './modal-modificar-rol.component';

describe('ModalModificarRolComponent', () => {
  let component: ModalModificarRolComponent;
  let fixture: ComponentFixture<ModalModificarRolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalModificarRolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalModificarRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
