import { Component, OnInit } from '@angular/core';
import { ErrorStateGitlabVar } from 'src/app/interfaces/error-state-gitlab-var';
import { GitlabVar } from 'src/app/interfaces/gitlab-var';
import { LoadingStateGitlabVar } from 'src/app/interfaces/loading-state-gitlab-var';
import { GitlabVariableService } from 'src/app/services/gitlab-variable.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  variableGitlabList: GitlabVar[] = [];
  loading: LoadingStateGitlabVar;
  error: ErrorStateGitlabVar;

  constructor(private gitlabVarService: GitlabVariableService) {
    this.error = this.gitlabVarService.getErrorState();
    this.loading = this.gitlabVarService.getLoadingState();
   }

  ngOnInit(): void {
    this.gitlabVarService.listGitlabVar.subscribe(data => this.variableGitlabList = data);
    this.gitlabVarService.loadingState.subscribe(data => this.loading = data);
    this.gitlabVarService.errorState
      .subscribe(data => this.error = data);
  }
}
