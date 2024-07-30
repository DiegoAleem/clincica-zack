import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendimentoOnlineComponent } from './atendimento-online.component';

describe('AtendimentoOnlineComponent', () => {
  let component: AtendimentoOnlineComponent;
  let fixture: ComponentFixture<AtendimentoOnlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtendimentoOnlineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtendimentoOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
