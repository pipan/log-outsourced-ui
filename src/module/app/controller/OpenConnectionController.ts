import { Controller } from '@/lib/framework'
import { Repository } from '@wildebeest/repository'
import { StatefulChannel } from '@wildebeest/observable'
import { Host } from '@/module/Host'

export class OpenConnectionController implements Controller {
    private error: StatefulChannel<any>
    private tokens: Repository<any>
    private connections: Repository<any>

    public constructor (error: StatefulChannel<any>, connections: Repository<any>, tokens: Repository<any>) {
        this.error = error
        this.tokens = tokens
        this.connections = connections
    }

    public action (data?: any): void {
        const conResult = this.connections.query()
            .property(data)

        const connection = conResult.get()
        conResult.close()
        if (!connection) {
            return
        }

        const host = Host.fromConnection(connection)

        const token = this.tokens.query()
            .property(connection.username + '@' + host)
            .imidiate()

        if (token) {
            return
        }
        this.error.dispatch({
            status: 401
        })
    }
}
