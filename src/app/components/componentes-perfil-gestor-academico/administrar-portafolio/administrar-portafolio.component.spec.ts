import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarPortafolioComponent } from './administrar-portafolio.component';

describe('AdministrarPortafolioComponent', () => {
  let component: AdministrarPortafolioComponent;
  let fixture: ComponentFixture<AdministrarPortafolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarPortafolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarPortafolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
