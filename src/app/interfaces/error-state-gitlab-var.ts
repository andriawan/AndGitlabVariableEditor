import { HttpErrorResponse } from "@angular/common/http";

export interface ErrorStateGitlabVar {
    [key:string]: HttpErrorResponse | undefined;
    projectInfo: HttpErrorResponse | undefined;
    variable: HttpErrorResponse | undefined;
}
