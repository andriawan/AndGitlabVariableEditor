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

  getAllProjects(id_user:string):string{
    return `${this.url}${this.version}/users/${id_user}/projects`
  }

  getLogin():string{
    return `${this.url}/oauth/token`
  }

  getGitlabOAuthAuthorize(payload: GitlabOauthPayload): string { 
    return `${this.mainUrl}/oauth/authorize?client_id=${payload.client_id}&response_type=${payload.response_type}&redirect_uri=${payload.redirect_uri}`
  }

  postCodeAuthGitlab(): string {
    return `${this.mainUrl}/oauth/token`;
  }

  getUser(): string {
    return `${this.url}${this.version}/user`;
  }

  createNewVar(id_project: string) {
    return `${this.url}${this.version}/projects/${id_project}/variables`
  }

  updateVar(id_project: string, key:string) {
    return `${this.url}${this.version}/projects/${id_project}/variables/${key}`
  }

  removeVar(id_project: string, key:string) {
    return `${this.url}${this.version}/projects/${id_project}/variables/${key}`
  }
} 