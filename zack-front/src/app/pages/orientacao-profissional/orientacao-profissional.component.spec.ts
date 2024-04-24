import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrientacaoProfissionalComponent } from './orientacao-profissional.component';

describe('OrientacaoProfissionalComponent', () => {
  let component: OrientacaoProfissionalComponent;
  let fixture: ComponentFixture<OrientacaoProfissionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrientacaoProfissionalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrientacaoProfissionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
