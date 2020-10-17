import { Controller } from './controller/Controller'

export interface ControllerProvider {
    getActions (): {[key: string]: Controller[]};
}
