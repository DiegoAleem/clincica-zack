import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaPsicologoComponent } from './area-psicologo.component';

describe('AreaPsicologoComponent', () => {
  let component: AreaPsicologoComponent;
  let fixture: ComponentFixture<AreaPsicologoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreaPsicologoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AreaPsicologoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
