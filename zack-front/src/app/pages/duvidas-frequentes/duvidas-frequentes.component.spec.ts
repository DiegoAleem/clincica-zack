import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuvidasFrequentesComponent } from './duvidas-frequentes.component';

describe('DuvidasFrequentesComponent', () => {
  let component: DuvidasFrequentesComponent;
  let fixture: ComponentFixture<DuvidasFrequentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuvidasFrequentesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DuvidasFrequentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
