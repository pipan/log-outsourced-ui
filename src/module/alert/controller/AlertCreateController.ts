import { Controller } from '@/lib/framework/controller/Controller'
import { Alertable } from '../Alertable'

export class AlertCreateController implements Controller {
    private alertable: Alertable

    public constructor (alertable: Alertable) {
        this.alertable = alertable
    }

    public action (data: any): void {
        this.alertable.push(data.type, data.message)
    }
}
