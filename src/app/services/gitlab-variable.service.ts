import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GitlabVar } from '../interfaces/gitlab-var';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class GitlabVariableService extends ApiService {

  constructor(private http: HttpClient) { 
    super();
  }

  getProjectVar(id_project: string, token: string):Observable<GitlabVar> {
    return this.http.get<GitlabVar>(this.getProjectsEndPoint(id_project), {
      headers: new HttpHeaders({
        PRIVATE_TOKEN: token
      })
    });
  }
}
