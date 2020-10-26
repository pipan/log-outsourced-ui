import { Controller } from '@/lib/framework'
import { Alertable } from '@/module/alert'
import { Repository } from '@wildebeest/repository'

export class ConnectionDeleteController implements Controller {
    private connections: Repository<any>
    private alertable: Alertable

    public constructor (connections: Repository<any>, alertable: Alertable) {
        this.connections = connections
        this.alertable = alertable
    }

    public action (data?: any): void {
        this.connections.remove(data)
        this.alertable.success('Removed')
    }
}
