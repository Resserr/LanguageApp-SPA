/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DislikeService } from './dislike.service';

describe('Service: Dislike', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DislikeService]
    });
  });

  it('should ...', inject([DislikeService], (service: DislikeService) => {
    expect(service).toBeTruthy();
  }));
});
