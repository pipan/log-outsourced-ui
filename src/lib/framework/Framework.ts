import { Controller } from './controller/Controller'

export interface Framework {
    process (event: string, data?: any): void;
    getObservable (name: string): any;
}
