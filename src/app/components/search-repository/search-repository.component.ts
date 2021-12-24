import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GitlabVar } from 'src/app/interfaces/gitlab-var';
import { GitlabVariableService } from 'src/app/services/gitlab-variable.service';

@Component({
  selector: 'search-repository',
  templateUrl: './search-repository.component.html',
  styleUrls: ['./search-repository.component.scss']
})
export class SearchRepositoryComponent implements OnInit {

  @Output('search') emitter = new EventEmitter<any>();

  projectId: string = "";
  gitlabVariableService: GitlabVariableService;
  loading: boolean = false;

  constructor(gitlabVariableService: GitlabVariableService) { 
    this.gitlabVariableService = gitlabVariableService;
  }

  ngOnInit(): void {
  }

  setText(data: string): void {
    this.projectId = data;
  }

  searchRepository() {
    console.log("t");
    if (!this.projectId) return;
    this.loading = true;
    this.emitter.emit({ loading: this.loading })
    setTimeout(() => {
      this.gitlabVariableService.getProjectVar(this.projectId, "1234").subscribe({
        next: (data: GitlabVar) => { this.loading = false;this.emitter.emit({ loading: this.loading, data: data }) },
        error: (error) => { this.loading = false; this.emitter.emit({ loading: this.loading, error: error }) }
      })
    }, 5000)
  }

}
