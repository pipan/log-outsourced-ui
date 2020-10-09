import { Controller } from '@/lib/framework'
import { StatefulChannel } from '@wildebeest/observable'

export class ConnectionErrorController implements Controller {
    private connection: StatefulChannel<any>

    public constructor (connection: StatefulChannel<any>) {
        this.connection = connection
    }

    public action (data?: any): void {
        const con = this.connection.get()
        this.connection.dispatch({
            id: con.id,
            error: data
        })
    }
}
