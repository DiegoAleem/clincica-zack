import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendimentoPresencialComponent } from './atendimento-presencial.component';

describe('AtendimentoPresencialComponent', () => {
  let component: AtendimentoPresencialComponent;
  let fixture: ComponentFixture<AtendimentoPresencialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtendimentoPresencialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtendimentoPresencialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
