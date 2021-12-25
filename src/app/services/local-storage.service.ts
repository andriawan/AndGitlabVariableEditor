import { Injectable } from '@angular/core';
import { GitlabToken } from '../interfaces/gitlab-token';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private _localStorage: Storage = localStorage;

  constructor() { }

  setData(key: string, value: any): void {
    this._localStorage.setItem(key, JSON.stringify(value));
  }

  getData(key: string): any {
    if (this._localStorage.getItem(key)) {
      let item = this._localStorage.getItem(key) as string;
      return JSON.parse(item);
    }
    return null;
  }

  setTokenData(key: string, value: GitlabToken): void {
    this._localStorage.setItem(key, JSON.stringify(value));
  }

  getTokenData(key: string): GitlabToken{
    if (this._localStorage.getItem(key)) {
      let item = this._localStorage.getItem(key) as string;
      return JSON.parse(item);
    }
    return {
      access_token: "",
      created_at: 0,
      expires_in: 0,
      refresh_token: "",
      scope: "",
      token_type: ""
    };
    
  }

  removeData(key: string): void {
    this._localStorage.removeItem(key);
  }

  removeAllData(): void {
    this._localStorage.clear();
  }
}
