import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNoValidarDocActComponent } from './modal-no-validar-doc-act.component';

describe('ModalNoValidarDocActComponent', () => {
  let component: ModalNoValidarDocActComponent;
  let fixture: ComponentFixture<ModalNoValidarDocActComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalNoValidarDocActComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNoValidarDocActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
