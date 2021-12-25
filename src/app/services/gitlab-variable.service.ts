import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GitlabProject } from '../interfaces/gitlab-project';
import { GitlabUser } from '../interfaces/gitlab-user';
import { GitlabVar } from '../interfaces/gitlab-var';
import { Config } from '../utils/config';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class GitlabVariableService extends ApiService {
  config: Config;

  constructor(private http: HttpClient, config: Config) { 
    super();
    this.config = config;
  }

  getProject(id_project: string, token: string):Observable<GitlabProject> {
    return this.http.get<GitlabProject>(this.getProjectsDetail(id_project), {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    });
  }

  getProjectVar(id_project: string, token: string):Observable<GitlabVar[]> {
    return this.http.get<GitlabVar[]>(this.getProjectsVariables(id_project), {
      headers: new HttpHeaders({
        "PRIVATE-TOKEN": token
      })
    });
  }

  postOAuthCode(code: string): Observable<any> {
    const body = new HttpParams()
      .set('code', code)
      .set('grant_type', "authorization_code")
      .set('redirect_uri', this.config.redirectUri)
      .set('client_id', this.config.clientId)
      .set('client_secret', this.config.secret);
    
    return this.http.post<any>(this.postCodeAuthGitlab(), body, {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
      })
    });
  }

  getLoggedUser(token:string): Observable<GitlabUser> {
    return this.http.get<GitlabUser>(this.getUser(), {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    })
  }

}
