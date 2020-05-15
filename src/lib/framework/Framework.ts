export interface Framework {
    process (event: string, data?: any): void;
    getObservable (name: string): any;
}
