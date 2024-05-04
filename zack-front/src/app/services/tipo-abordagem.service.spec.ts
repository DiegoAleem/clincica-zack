import { TestBed } from '@angular/core/testing';

import { TipoAbordagemService } from './tipo-abordagem.service';

describe('TipoAbordagemService', () => {
  let service: TipoAbordagemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoAbordagemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
