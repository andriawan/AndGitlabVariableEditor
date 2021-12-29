import { Component, Input, OnInit } from '@angular/core';
import { ToggleGitlabValue } from 'src/app/enum/toggle-gitlab-value';
import { GitlabVar } from 'src/app/interfaces/gitlab-var';
import { GitlabTokenService } from 'src/app/services/gitlab-token.service';
import { GitlabVariableService } from 'src/app/services/gitlab-variable.service';

@Component({
  selector: 'single-var-gitlab',
  templateUrl: './single-var-gitlab.component.html',
  styleUrls: ['./single-var-gitlab.component.scss']
})
export class SingleVarGitlabComponent implements OnInit {

  @Input("item") variable: GitlabVar = {
    variable_type : "",
    environment_scope: "",
    key: "",
    value: "",
    protected: false,
    masked: false
  };

  inputKeyType:string = ToggleGitlabValue.TEXT;
  inputValueType:string = ToggleGitlabValue.PASSWORD;

  constructor(private gitlabVarService: GitlabVariableService, private token:GitlabTokenService) { }

  ngOnInit(): void {
    this.gitlabVarService.inputValueVisibilty.subscribe(data => {
      this.inputValueType = data
    });
  }

  remove(item: GitlabVar) {
    if (window.confirm("Are you sure you want to delete this variable?")) {
      let token = this.token.getTokenSync();
      let projectId = this.gitlabVarService.getProjectId();
      this.gitlabVarService.removeSingleGitlabVar(projectId, token.access_token, item).subscribe({
        next: () => {
          this.gitlabVarService.removeGitlabVar(item.key);
          window.alert(`Variable ${item.key} has been deleted`);
        }
      });
      
    }
  }

}
