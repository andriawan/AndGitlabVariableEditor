import { HttpErrorResponse } from "@angular/common/http";

export interface GitlabProject {
    id: string;
    web_url: string;
    name: string;
    created_at: string;
    error?: HttpErrorResponse;
}
