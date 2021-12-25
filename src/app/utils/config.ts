import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class Config {
    public readonly clientId: string = "df4dea51ed3405d4c842f4f489abac0b152f341d4aaee979add6ce559a0ea6f9";
    public readonly secret: string = "eaffd4d48593d1a8c3a74de20006396b072a41e2a34f97f67b75f9efe570fa80";
    public readonly redirectUri: string = "http://localhost:4200/";
}