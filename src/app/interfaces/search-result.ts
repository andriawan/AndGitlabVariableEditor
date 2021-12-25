import { HttpErrorResponse } from "@angular/common/http";
import { GitlabVar } from "./gitlab-var";

export interface SearchResult {
    loading: boolean,
    error?: HttpErrorResponse,
    data?: GitlabVar[]
}
