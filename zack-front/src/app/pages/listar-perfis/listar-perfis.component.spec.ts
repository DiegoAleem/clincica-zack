import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPerfisComponent } from './listar-perfis.component';

describe('ListarPerfisComponent', () => {
  let component: ListarPerfisComponent;
  let fixture: ComponentFixture<ListarPerfisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarPerfisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarPerfisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
