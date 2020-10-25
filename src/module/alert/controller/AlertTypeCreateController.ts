import { Controller } from '@/lib/framework/controller/Controller'
import { Alertable } from '../Alertable'

export class AlertTypeCreateController implements Controller {
    private alertable: Alertable
    private type: string

    public constructor (type: string, alertable: Alertable) {
        this.type = type
        this.alertable = alertable
    }

    public action (data: any): void {
        this.alertable.push(this.type, data)
    }
}
