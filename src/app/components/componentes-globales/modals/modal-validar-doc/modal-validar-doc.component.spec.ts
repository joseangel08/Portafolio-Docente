import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalValidarDocComponent } from './modal-validar-doc.component';

describe('ModalValidarDocComponent', () => {
  let component: ModalValidarDocComponent;
  let fixture: ComponentFixture<ModalValidarDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalValidarDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalValidarDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
