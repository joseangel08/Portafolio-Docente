import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalValidarDocActComponent } from './modal-validar-doc-act.component';

describe('ModalValidarDocActComponent', () => {
  let component: ModalValidarDocActComponent;
  let fixture: ComponentFixture<ModalValidarDocActComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalValidarDocActComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalValidarDocActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
