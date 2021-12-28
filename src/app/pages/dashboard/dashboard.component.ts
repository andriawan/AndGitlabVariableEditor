import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ErrorStateGitlabVar } from 'src/app/interfaces/error-state-gitlab-var';
import { GitlabVar } from 'src/app/interfaces/gitlab-var';
import { LoadingStateGitlabVar } from 'src/app/interfaces/loading-state-gitlab-var';
import { GitlabVariableService } from 'src/app/services/gitlab-variable.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  variableGitlabList: GitlabVar[] = [];
  loading: LoadingStateGitlabVar;
  error: ErrorStateGitlabVar;
  private subscription: Subscription = new Subscription();

  constructor(private gitlabVarService: GitlabVariableService) {
    this.error = this.gitlabVarService.getErrorState();
    this.loading = this.gitlabVarService.getLoadingState();
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription.add(this.gitlabVarService.listGitlabVar.subscribe(data => this.variableGitlabList = data));
    this.subscription.add(this.gitlabVarService.loadingState.subscribe(data => this.loading = data));
    this.subscription.add(this.gitlabVarService.errorState
      .subscribe(data => this.error = data));
  }

}
