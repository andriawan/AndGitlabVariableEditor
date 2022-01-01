import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GitlabTokenService } from 'src/app/services/gitlab-token.service';
import { GitlabVariableService } from 'src/app/services/gitlab-variable.service';
import { Config } from 'src/app/utils/config';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  subscription: Subscription = new Subscription();

  constructor(private gitlab: GitlabVariableService,
    private config: Config,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private token: GitlabTokenService) { 
  }

  ngOnInit(): void {
    this.token.getToken()
    this.checkCodeAuth();
  }

  checkCodeAuth(): void {
    this.subscription.add(this.token.gitlabToken$.subscribe(data => {
      if (data.access_token) {
        this.router.navigate(["/dashboard"]);
      } else {
        this.activeRouter.queryParams.subscribe(params => {
          let { code } = params;
          if (code) {
            this.gitlab.postOAuthCode(code).subscribe(data => {
              this.token.setToken(data);
              this.subscription.unsubscribe();
            });
          }
        });
        
      }
    }));
  }

  authorize():void {
    window.location.replace(this.gitlab.getGitlabOAuthAuthorize({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      response_type: this.config.responseType,
    }));
  }

}
