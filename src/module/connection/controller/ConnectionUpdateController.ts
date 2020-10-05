import { Controller } from '@/lib/framework'
import { AlertHelper } from '@/module/alert'
import { Channel } from '@wildebeest/observable'
import { Repository } from '@wildebeest/repository'

export class ConnectionUpdateController implements Controller {
    private connections: Repository<any>
    private channel: Channel<any>

    public constructor (connections: Repository<any>, channel: Channel<any>) {
        this.connections = connections
        this.channel = channel
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

        this.channel.dispatch(
            AlertHelper.infoEvent('Connection has been updated')
        )

        if (data.success) {
            data.success()
        }
    }
}
