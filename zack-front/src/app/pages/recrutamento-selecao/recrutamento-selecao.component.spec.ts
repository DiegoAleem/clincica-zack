import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecrutamentoSelecaoComponent } from './recrutamento-selecao.component';

describe('RecrutamentoSelecaoComponent', () => {
  let component: RecrutamentoSelecaoComponent;
  let fixture: ComponentFixture<RecrutamentoSelecaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecrutamentoSelecaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecrutamentoSelecaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
