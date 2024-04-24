import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SouPsicologoComponent } from './sou-psicologo.component';

describe('SouPsicologoComponent', () => {
  let component: SouPsicologoComponent;
  let fixture: ComponentFixture<SouPsicologoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SouPsicologoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SouPsicologoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
