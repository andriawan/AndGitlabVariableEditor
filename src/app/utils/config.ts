import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class Config {
    public readonly responseType: string = "code";
    public readonly grantType: string = "authorization_code";
    public readonly grantTypeRefreshToken: string = "refresh_token";
    public readonly perPageVariables: number = 1000;
}