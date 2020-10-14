import { Controller } from '@/lib/framework'
import { Repository } from '@wildebeest/repository'
import { Alertable } from '@/module/alert'

export class ConnectionCreateController implements Controller {
    private connections: Repository<any>
    private alertable: Alertable

    public constructor (connections: Repository<any>, alertable: Alertable) {
        this.connections = connections
        this.alertable = alertable
    }

    public action (data?: any): void {
        const body = data.body
        const id = Math.floor(Math.random() * 1000000)
        this.connections.insert({
            id: id + '',
            name: body.name,
            host: body.host,
            username: body.username
        })
        this.alertable.info('Connection has been created')
        if (data.success) {
            data.success()
        }
    }
}
