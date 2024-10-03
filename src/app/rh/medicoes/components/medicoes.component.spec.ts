import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoesComponent } from './medicoes.component';

describe('ComponentsComponent', () => {
  let component: MedicoesComponent;
  let fixture: ComponentFixture<MedicoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicoesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
