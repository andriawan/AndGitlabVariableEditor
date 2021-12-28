import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToggleGitlabValue } from '../enum/toggle-gitlab-value';
import { ErrorStateGitlabVar } from '../interfaces/error-state-gitlab-var';
import { GitlabProject } from '../interfaces/gitlab-project';
import { GitlabUser } from '../interfaces/gitlab-user';
import { GitlabVar } from '../interfaces/gitlab-var';
import { LoadingStateGitlabVar } from '../interfaces/loading-state-gitlab-var';
import { Config } from '../utils/config';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class GitlabVariableService extends ApiService {
  config: Config;
  private _inputValueVisibilty$: BehaviorSubject<ToggleGitlabValue> = new BehaviorSubject<ToggleGitlabValue>(ToggleGitlabValue.PASSWORD); ;
  private _listGitlabVar$: BehaviorSubject<GitlabVar[]> = new BehaviorSubject<GitlabVar[]>([]);
  private _loadingState$: BehaviorSubject<LoadingStateGitlabVar> = new BehaviorSubject<LoadingStateGitlabVar>({
    projectInfo: false,
    variable: false
  });
  private _errorState$: BehaviorSubject<ErrorStateGitlabVar> = new BehaviorSubject<ErrorStateGitlabVar>({
    projectInfo: undefined,
    variable: undefined
  });

  public inputValueVisibilty: Observable<ToggleGitlabValue> = this._inputValueVisibilty$.asObservable();
  public listGitlabVar: Observable<GitlabVar[]> = this._listGitlabVar$.asObservable();
  public loadingState: Observable<LoadingStateGitlabVar> = this._loadingState$.asObservable();
  public errorState: Observable<ErrorStateGitlabVar> = this._errorState$.asObservable();

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

  setLoadingState(key: string, value: boolean): void {
    let state = this._loadingState$.getValue();
    state[key] = value;
    this._loadingState$.next(state);
  }

  setErrorState(key: string, value: HttpErrorResponse | undefined): void {
    let state = this._errorState$.getValue();
    state[key] = value;
    this._errorState$.next(state);
  }

  getLoadingState(): LoadingStateGitlabVar { 
    return this._loadingState$.getValue();
  }

  getErrorState(): ErrorStateGitlabVar { 
    return this._errorState$.getValue();
  }

  setGitlabVarList(listData: GitlabVar[]):void {
    this._listGitlabVar$.next(listData);
  }

  getGitlabVarList():GitlabVar[] {
    return this._listGitlabVar$.getValue()
  }

  clearGitlabVarList():void {
    this._listGitlabVar$.next([]);
  }

  setSingleGitlabVar(item: GitlabVar):void {
    let list = this._listGitlabVar$.getValue();
    list.push(item);
  }

  updateSingleGitlabVar(index:number, item: GitlabVar):void {
    let list = this._listGitlabVar$.getValue();
    list[index] = item;
  }

  removeGitlabVar(index: number | number[]): void {
    let list = this._listGitlabVar$.getValue();
    let newList;
    if (Array.isArray(index)) {
      newList = list.filter((_val, indexVal) => {
        return !index.includes(indexVal);
      })
      this._listGitlabVar$.next(newList);
    } else {
      list.splice(index, 1);
    }
  }

  toggleVisibilityInput() {
    let state = this._inputValueVisibilty$.getValue();
    if (state === ToggleGitlabValue.TEXT) {
      this._inputValueVisibilty$.next(ToggleGitlabValue.PASSWORD);
    }
    if(state === ToggleGitlabValue.PASSWORD) {
      this._inputValueVisibilty$.next(ToggleGitlabValue.TEXT);
    }
  }

  getProjectVar(id_project: string, token: string):Observable<GitlabVar[]> {
    return this.http.get<GitlabVar[]>(this.getProjectsVariables(id_project), {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    });
  }

  postOAuthCode(code: string): Observable<any> {
    const body = new HttpParams()
      .set('code', code)
      .set('grant_type', this.config.grantType)
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
