import { TestBed } from '@angular/core/testing';

import { RecordVideoService } from './record-video.service';

describe('RecordVideoService', () => {
  let service: RecordVideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecordVideoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
