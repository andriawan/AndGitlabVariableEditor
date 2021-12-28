import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ToggleGitlabValue } from 'src/app/enum/toggle-gitlab-value';
import { ErrorStateGitlabVar } from 'src/app/interfaces/error-state-gitlab-var';
import { GitlabProject } from 'src/app/interfaces/gitlab-project';
import { GitlabVar } from 'src/app/interfaces/gitlab-var';
import { LoadingStateGitlabVar } from 'src/app/interfaces/loading-state-gitlab-var';
import { GitlabTokenService } from 'src/app/services/gitlab-token.service';
import { GitlabVariableService } from 'src/app/services/gitlab-variable.service';

@Component({
  selector: 'search-repository',
  templateUrl: './search-repository.component.html',
  styleUrls: ['./search-repository.component.scss']
})
export class SearchRepositoryComponent implements OnInit {

  projectId: string = "";
  private gitlabVarData: GitlabVar[] = [];
  repoDetail: GitlabProject = {
    id: "",
    name: "",
    created_at: "",
    web_url: "",
  }
  loading: LoadingStateGitlabVar;
  error: ErrorStateGitlabVar;
  inputValueVisibility: ToggleGitlabValue = ToggleGitlabValue.PASSWORD;
  @ViewChild("file_json") input: ElementRef | undefined;

  constructor(
    private gitlabVariableService: GitlabVariableService,
    private gitlabToken: GitlabTokenService) { 
    this.error = this.gitlabVariableService.getErrorState();
    this.loading = this.gitlabVariableService.getLoadingState();
  }

  ngOnInit(): void {
    this.gitlabVariableService.inputValueVisibilty.subscribe(data => { 
      this.inputValueVisibility = data
    })
  }

  importJSON() {
    this.input?.nativeElement.click();
  }

  processJSON(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    const fileReader = new FileReader();
    let fileList: FileList | null = element.files;
    let file: File | null | undefined = fileList?.item(0);
    if (file) {
      fileReader.onloadend = (e) => {
        this.validateJSONData(e.target?.result)
      }
      fileReader.readAsText(file);
    }
  }

  validateJSONData(json: FileReader["result"] | undefined) {
    try {
      let data: any[] = JSON.parse(json as string);
      if(!Array.isArray(data)) throw Error(`not valid array json.`)
      let processedData = data.filter(item => {
        return item.key && item.value
      }).map((item) => {
        return {
          key: item.key,
          value: item.value
        }
      })
      if (processedData.length <= 0) { 
        throw Error(`not valid json. please provide object like {"key" : "sample", "value": "sample"}`)
      }
      console.log(processedData)
    } catch (error) {
      window.alert(error);
    }
  }

  exportVariable(): void {
    if (this.gitlabVarData.length === 0) return;
    let data = this.gitlabVarData.map(value => { 
      return `${value.key}=${value.value}`
    }).join("\n")

    let myBlob = new Blob([data], { type: "application/octet-stream" });
    let blobURL = URL.createObjectURL(myBlob);
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
    this.gitlabVariableService.setLoadingState("projectInfo", true);
    this.gitlabVariableService.setLoadingState("variable", true);
    this.gitlabVariableService.setErrorState("projectInfo", undefined);
    this.gitlabVariableService.setErrorState("variable", undefined);

    this.gitlabToken.getToken();
    this.gitlabToken.gitlabToken$.subscribe(data => { 
      this.gitlabVariableService.getProjectVar(this.projectId, data.access_token).subscribe({
        next: (data: GitlabVar[]) => {
          this.gitlabVariableService.setLoadingState("variable", false);
          this.gitlabVariableService.setGitlabVarList(data);
        },
        error: (error: HttpErrorResponse) => {
          this.gitlabVariableService.setLoadingState("variable", false);
          this.gitlabVariableService.setErrorState("variable", error);
        }
      });

      this.gitlabVariableService.getProject(this.projectId, data.access_token).subscribe({
        next: (data: GitlabProject) => {
          this.gitlabVariableService.setLoadingState("projectInfo", false);
          this.repoDetail = data;
        },
        error: (error: HttpErrorResponse) => {
          this.gitlabVariableService.setLoadingState("projectInfo", false);
          this.gitlabVariableService.setErrorState("projectInfo", error);
        }
      })
    })
  }

}
