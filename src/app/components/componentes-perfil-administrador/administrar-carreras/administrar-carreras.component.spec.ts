import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarCarrerasComponent } from './administrar-carreras.component';

describe('AdministrarCarrerasComponent', () => {
  let component: AdministrarCarrerasComponent;
  let fixture: ComponentFixture<AdministrarCarrerasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarCarrerasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarCarrerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
