import { Controller } from '@/lib/framework'
import { Repository } from '@wildebeest/repository'
import { Alertable } from '@/module/alert'

export class ConnectionUpdateController implements Controller {
    private connections: Repository<any>
    private alertable: Alertable

    public constructor (connections: Repository<any>, alertable: Alertable) {
        this.connections = connections
        this.alertable = alertable
    }

    public action (data?: any): void {
        const id = data.id
        const body = data.body
        this.connections.insert({
            id: id,
            name: body.name,
            host: body.host,
            username: body.username
        })
        this.alertable.success('')

        if (data.success) {
            data.success()
        }
    }
}
