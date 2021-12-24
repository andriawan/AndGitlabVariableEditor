export interface GitlabVar {
    variable_type: string,
    key: string,
    value: string,
    protected: boolean,
    masked: boolean,
    environment_scope: string
}
