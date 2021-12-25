import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GitlabProject } from 'src/app/interfaces/gitlab-project';
import { GitlabVar } from 'src/app/interfaces/gitlab-var';
import { SearchResult } from 'src/app/interfaces/search-result';
import { GitlabTokenService } from 'src/app/services/gitlab-token.service';
import { GitlabVariableService } from 'src/app/services/gitlab-variable.service';

@Component({
  selector: 'search-repository',
  templateUrl: './search-repository.component.html',
  styleUrls: ['./search-repository.component.scss']
})
export class SearchRepositoryComponent implements OnInit {

  @Output('search') emitter = new EventEmitter<SearchResult>();

  projectId: string = "";
  loading: boolean = false;
  loadingRepoDetail: boolean = false;
  repoDetail: GitlabProject = {
    id: "",
    name: "",
    created_at: "",
    web_url: "",
  }

  constructor(
    private gitlabVariableService: GitlabVariableService,
    private gitlabToken: GitlabTokenService) { 
  }

  ngOnInit(): void {
  }

  setText(data: string): void {
    this.projectId = data;
  }

  searchRepository() {
    if (!this.projectId) return;
    this.loading = true;
    this.loadingRepoDetail = true;
    this.emitter.emit({ loading: this.loading })
    this.gitlabVariableService.getProjectVar(this.projectId, "glpat-MiYCe6bcQ2kVzzcNpSBi").subscribe({
      next: (data: GitlabVar[]) => { this.loading = false; this.emitter.emit({ loading: this.loading, data: data }) },
      error: (error: HttpErrorResponse) => { this.loading = false; this.emitter.emit({ loading: this.loading, error: error }) }
    });
    this.gitlabToken.getToken();
    this.gitlabToken.gitlabToken$.subscribe(data => { 
      this.gitlabVariableService.getProject(this.projectId, data.access_token).subscribe({
        next: (data: GitlabProject) => { this.loadingRepoDetail = false; this.repoDetail = data;},
        error: (error: HttpErrorResponse) => { this.loadingRepoDetail = false; this.repoDetail.error = error; }
      })
    })
  }

}
