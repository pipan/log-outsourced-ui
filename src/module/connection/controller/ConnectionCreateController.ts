import { Controller } from '@/lib/framework'
import { Alertable } from '@/module/alert'
import { ConnectionService } from '../ConnectionService'

export class ConnectionCreateController implements Controller {
    private alertable: Alertable
    private service: ConnectionService

    public constructor (service: ConnectionService, alertable: Alertable) {
        this.service = service
        this.alertable = alertable
    }

    public action (data?: any): void {
        const body = data.body
        const connection = this.service.create(body)
        this.alertable.info('Connection has been created')
        if (data.success) {
            data.success(connection)
        }
    }
}
