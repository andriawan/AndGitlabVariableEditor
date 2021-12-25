import { Component, OnInit } from '@angular/core';
import { GitlabVariableService } from 'src/app/services/gitlab-variable.service';
import { Config } from 'src/app/utils/config';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  gitlab: GitlabVariableService;
  config: Config;

  constructor(gitlab: GitlabVariableService, config: Config) { 
    this.gitlab = gitlab;
    this.config = config;
  }

  ngOnInit(): void {}

  authorize():void {
    window.location.replace(this.gitlab.getGitlabOAuthAuthorize({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      response_type: "code",
    }));
  }

}
