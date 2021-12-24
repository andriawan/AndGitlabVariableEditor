import { TestBed } from '@angular/core/testing';

import { GitlabVariableService } from './gitlab-variable.service';

describe('GitlabVariableService', () => {
  let service: GitlabVariableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GitlabVariableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
