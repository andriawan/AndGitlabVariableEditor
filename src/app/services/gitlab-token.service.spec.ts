import { TestBed } from '@angular/core/testing';

import { GitlabTokenService } from './gitlab-token.service';

describe('GitlabTokenService', () => {
  let service: GitlabTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GitlabTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
