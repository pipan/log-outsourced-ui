import { Listener } from '@/lib/broadcast/Listener';
import { Controller } from './Controller';

export class ControllerListener implements Listener {
    private controller: Controller

    public constructor (controller: Controller) {
        this.controller = controller
    }

    public handle (data?: any): void {
        this.controller.action(data)
    }
}
