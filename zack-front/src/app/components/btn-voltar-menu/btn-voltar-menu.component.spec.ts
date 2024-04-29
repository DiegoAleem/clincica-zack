import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnVoltarMenuComponent } from './btn-voltar-menu.component';

describe('BtnVoltarMenuComponent', () => {
  let component: BtnVoltarMenuComponent;
  let fixture: ComponentFixture<BtnVoltarMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnVoltarMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnVoltarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
