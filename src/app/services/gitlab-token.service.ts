import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GitlabToken } from '../interfaces/gitlab-token';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GitlabTokenService {

  private LABEL: string = "token_obj";

  private _gitlabToken$: BehaviorSubject<GitlabToken> = new BehaviorSubject<GitlabToken>({
    access_token: '',
    created_at: 0,
    expires_in: 0,
    refresh_token: '',
    scope: '',
    token_type: ''
  });

  public gitlabToken$: Observable<GitlabToken> = this._gitlabToken$.asObservable();

  constructor(private localData: LocalStorageService) { }

  getToken(): void {
    let data: GitlabToken = this.localData.getTokenData(this.LABEL)
    this._gitlabToken$.next(data);
  }

  getTokenSync(): GitlabToken {
    return this.localData.getTokenData(this.LABEL)
  }

  setToken(data: GitlabToken): void {
    this.localData.setTokenData(this.LABEL, data);
    this._gitlabToken$.next(data);
  }

  clearToken() {
    this.localData.removeData(this.LABEL);
    this._gitlabToken$.next({
      access_token: '',
      created_at: 0,
      expires_in: 0,
      refresh_token: '',
      scope: '',
      token_type: ''
    });
   }
}
