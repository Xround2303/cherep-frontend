export enum Severity {
    secondary = "secondary",
    success = "success",
    info = "info",
    warning = "warning",
    danger = "danger",
    contrast = "contrast"
}

export type Item = {
    id: number,
    value: string,
    severity: Severity
}