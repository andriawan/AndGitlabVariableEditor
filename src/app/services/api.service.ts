import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly url: string = "https://gitlab.com/api/";
  version: string = "v4";

  constructor() { }

  getProjectsEndPoint(id:string):string{
    return `${this.url}${this.version}/projects/${id}/variables`
  }
}
