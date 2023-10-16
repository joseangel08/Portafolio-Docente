import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarPortafolioComponent } from './visualizar-portafolio.component';

describe('VisualizarPortafolioComponent', () => {
  let component: VisualizarPortafolioComponent;
  let fixture: ComponentFixture<VisualizarPortafolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarPortafolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarPortafolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
