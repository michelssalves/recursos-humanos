import { TestBed } from '@angular/core/testing';
import { MedicoesService } from './medicoes.service';

describe('MedicoesService', () => {
  let service: MedicoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
