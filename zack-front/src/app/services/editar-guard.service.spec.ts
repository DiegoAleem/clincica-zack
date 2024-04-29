import { TestBed } from '@angular/core/testing';

import { EditarGuardService } from './editar-guard.service';

describe('EditarGuardService', () => {
  let service: EditarGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditarGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
