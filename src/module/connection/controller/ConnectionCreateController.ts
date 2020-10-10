import { Controller } from '@/lib/framework'
import { AlertHelper } from '@/module/alert'
import { Channel } from '@wildebeest/observable'
import { Repository } from '@wildebeest/repository'

export class ConnectionCreateController implements Controller {
    private connections: Repository<any>
    private channel: Channel<any>

    public constructor (connections: Repository<any>, channel: Channel<any>) {
        this.connections = connections
        this.channel = channel
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

        this.channel.dispatch(
            AlertHelper.infoEvent('Connection has been created')
        )

        // this.channel.dispatch({ event: 'listener.create@reset' })
        if (data.success) {
            data.success()
        }
    }
}
