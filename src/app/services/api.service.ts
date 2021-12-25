import { Injectable } from '@angular/core';
import { GitlabOauthPayload } from '../interfaces/gitlab-oauth-payload';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly url: string = "https://gitlab.com/api/";
  readonly mainUrl: string = "https://gitlab.com";
  version: string = "v4";

  constructor() { }

  getProjectsVariables(id:string):string{
    return `${this.url}${this.version}/projects/${id}/variables`
  }

  getProjectsDetail(id:string):string{
    return `${this.url}${this.version}/projects/${id}`
  }

  getLogin():string{
    return `${this.url}/oauth/token`
  }

  getGitlabOAuthAuthorize(payload: GitlabOauthPayload): string { 
    return `${this.mainUrl}/oauth/authorize?client_id=${payload.client_id}&response_type=${payload.response_type}&redirect_uri=${payload.redirect_uri}`
  }
} 