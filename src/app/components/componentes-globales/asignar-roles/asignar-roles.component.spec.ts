import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarRolesComponent } from './asignar-roles.component';

describe('AsignarRolesComponent', () => {
  let component: AsignarRolesComponent;
  let fixture: ComponentFixture<AsignarRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
