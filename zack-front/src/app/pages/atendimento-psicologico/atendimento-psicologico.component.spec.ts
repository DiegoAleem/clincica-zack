import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendimentoPsicologicoComponent } from './atendimento-psicologico.component';

describe('AtendimentoPsicologicoComponent', () => {
  let component: AtendimentoPsicologicoComponent;
  let fixture: ComponentFixture<AtendimentoPsicologicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtendimentoPsicologicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtendimentoPsicologicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
