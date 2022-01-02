import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GitlabUser } from 'src/app/interfaces/gitlab-user';
import { GitlabTokenService } from 'src/app/services/gitlab-token.service';
import { GitlabVariableService } from 'src/app/services/gitlab-variable.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  gitlabUser: GitlabUser = {
    id: "",
    name: "",
    email: "",
    username: "",
    avatar_url: "",
    web_url: ""
  }

  constructor(private router: Router,
    private token: GitlabTokenService,
    private gitlab: GitlabVariableService) { 
    this.gitlabUser = this.gitlab.getGitlabUser();
    }

  ngOnInit(): void {
    let data = this.token.getTokenSync();
    if (!data.access_token) {
      this.router.navigate(['/']);
      return;
    }
    if (this.gitlabUser.id == "") { 
      this.gitlab.getLoggedUser(data.access_token).subscribe(data => {
        this.gitlabUser = data;
        this.gitlab.setGitlabUser(data);
      })
    }
  }

  goToLandingPage(): void{
    this.router.navigate(['/']);
  }

  logout(): void{
    this.token.clearToken();
    this.router.navigate(['/']);
  }

}
