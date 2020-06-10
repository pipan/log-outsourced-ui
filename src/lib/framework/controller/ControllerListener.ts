import { Controller } from './Controller'
import { Dispatchable } from '@wildebeest/observable'

export class ControllerListener implements Dispatchable<any> {
    private controller: Controller

    public constructor (controller: Controller) {
        this.controller = controller
    }

    public dispatch (data?: any): void {
        this.controller.action(data)
    }
}
