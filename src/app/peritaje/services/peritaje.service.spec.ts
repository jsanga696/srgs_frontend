import { TestBed } from '@angular/core/testing';

import { PeritajeService } from './peritaje.service';

describe('PeritajeService', () => {
  let service: PeritajeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeritajeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
