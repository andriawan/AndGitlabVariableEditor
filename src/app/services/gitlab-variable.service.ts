import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GitlabProject } from '../interfaces/gitlab-project';
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
        "PRIVATE-TOKEN": token
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

}
