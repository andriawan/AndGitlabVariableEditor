import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToggleGitlabValue } from 'src/app/enum/toggle-gitlab-value';
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
  private gitlabVarData: GitlabVar[] = [];
  repoDetail: GitlabProject = {
    id: "",
    name: "",
    created_at: "",
    web_url: "",
  }
  inputValueVisibility: ToggleGitlabValue = ToggleGitlabValue.PASSWORD;

  constructor(
    private gitlabVariableService: GitlabVariableService,
    private gitlabToken: GitlabTokenService) { 
  }

  ngOnInit(): void {
    this.gitlabVariableService.inputValueVisibilty.subscribe(data => { 
      this.inputValueVisibility = data
    })
  }

  exportVariable(): void {
    if (this.gitlabVarData.length === 0) return;
    let data = this.gitlabVarData.map(value => { 
      return `${value.key}=${value.value}`
    }).join("\n")

    let myBlob = new Blob([data], { type: "application/octet-stream" });
    let blobURL = URL.createObjectURL(myBlob);
    console.log(blobURL);
    let href = document.createElement("a");
    href.href = blobURL;
    href.download = `env-${this.repoDetail.name}`;
    href.click();
  }

  exportVariableJSON(): void {
    if (this.gitlabVarData.length === 0) return;
    let data = this.gitlabVarData.map(value => { 
      return {
        key: value.key,
        value: value.value
      }
    })

    let myBlob = new Blob([JSON.stringify(data)], { type: "application/json" });
    let blobURL = URL.createObjectURL(myBlob);
    console.log(blobURL);
    let href = document.createElement("a");
    href.href = blobURL;
    href.download = `data-var-${this.repoDetail.name}`;
    href.click();
  }

  setLabel():string {
    if(this.inputValueVisibility === ToggleGitlabValue.PASSWORD) {
      return "Show Value"
    }
    if(this.inputValueVisibility === ToggleGitlabValue.TEXT) {
      return "Hide Value"
    }

    return "Loading...";
  }

  setText(data: string): void {
    this.projectId = data;
  }

  toggleValueVisibility() {
    this.gitlabVariableService.toggleVisibilityInput()
  }

  searchRepository() {
    if (!this.projectId) return;
    this.loading = true;
    this.loadingRepoDetail = true;
    this.emitter.emit({ loading: this.loading })
    this.gitlabVariableService.getProjectVar(this.projectId, "glpat-MiYCe6bcQ2kVzzcNpSBi").subscribe({
      next: (data: GitlabVar[]) => {
        this.loading = false;
        this.emitter.emit({ loading: this.loading, data: data })
        this.gitlabVarData = data;
      },
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
