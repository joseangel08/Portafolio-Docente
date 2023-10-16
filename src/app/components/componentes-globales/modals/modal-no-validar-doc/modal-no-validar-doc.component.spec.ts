import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNoValidarDocComponent } from './modal-no-validar-doc.component';

describe('ModalNoValidarDocComponent', () => {
  let component: ModalNoValidarDocComponent;
  let fixture: ComponentFixture<ModalNoValidarDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalNoValidarDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNoValidarDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
