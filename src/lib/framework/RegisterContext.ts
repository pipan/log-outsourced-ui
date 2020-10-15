import { ControllerProvider } from './ControllerProvider'
import { Controller } from './controller/Controller'
import { Dispatchable } from '@wildebeest/observable'

export interface RegisterContext {
    withControllerProvider (provider: ControllerProvider): RegisterContext;
    withController (key: string, controller: Controller): RegisterContext;
    getDispatcher (): Dispatchable<any>;
}
