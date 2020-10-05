import { Controller } from '@/lib/framework'
import { AlertHelper } from '@/module/alert'
import { Channel } from '@wildebeest/observable'
import { Repository } from '@wildebeest/repository'

export class ConnectionDeleteController implements Controller {
    private connections: Repository<any>
    private channel: Channel<any>

    public constructor (connections: Repository<any>, channel: Channel<any>) {
        this.connections = connections
        this.channel = channel
    }

    public action (data?: any): void {
        this.connections.remove(data)

        this.channel.dispatch(
            AlertHelper.infoEvent('Connection has been removed')
        )
    }
}
