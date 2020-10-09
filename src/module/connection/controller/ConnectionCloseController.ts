import { Controller } from '@/lib/framework'
import { StatefulChannel } from '@wildebeest/observable'

export class ConnectionCloseController implements Controller {
    private connection: StatefulChannel<any>

    public constructor (connection: StatefulChannel<any>) {
        this.connection = connection
    }

    public action (data?: any): void {
        this.connection.dispatch(null)
    }
}
