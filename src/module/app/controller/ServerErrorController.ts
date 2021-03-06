import { Controller } from '@/lib/framework'
import { Alertable } from '@/module/alert'

export class ServerErrorController implements Controller {
    private alertable: Alertable

    public constructor (alertable: Alertable) {
        this.alertable = alertable
    }

    public action (data?: any): void {
        this.alertable.error('I\'m afraid I cannot do that.')
    }
}
