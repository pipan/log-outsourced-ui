export interface Alertable {
    info (message: string): void;
    success (message: string): void;
    warning (message: string): void;
    error (message: string): void;
    push (type: string, message: string): void;
}
