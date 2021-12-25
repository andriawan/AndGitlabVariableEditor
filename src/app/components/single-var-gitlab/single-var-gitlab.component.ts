import { Component, Input, OnInit } from '@angular/core';
import { GitlabVar } from 'src/app/interfaces/gitlab-var';

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

  constructor() { }

  ngOnInit(): void {
  }

}
