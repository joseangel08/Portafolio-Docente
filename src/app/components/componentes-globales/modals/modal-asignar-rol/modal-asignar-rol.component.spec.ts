import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAsignarRolComponent } from './modal-asignar-rol.component';

describe('ModalAsignarRolComponent', () => {
  let component: ModalAsignarRolComponent;
  let fixture: ComponentFixture<ModalAsignarRolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAsignarRolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAsignarRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
