import { Component, Input, OnInit } from '@angular/core';
import { ToggleGitlabValue } from 'src/app/enum/toggle-gitlab-value';
import { GitlabVar } from 'src/app/interfaces/gitlab-var';
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

  constructor(private gitlabVarService: GitlabVariableService) { }

  ngOnInit(): void {
    this.gitlabVarService.inputValueVisibilty.subscribe(data => {
      this.inputValueType = data
    });
  }

}
