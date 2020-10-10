import { Controller } from '@/lib/framework'
import { StatefulChannel } from '@wildebeest/observable'

export class ConnectionCloseController implements Controller {
    private auth: StatefulChannel<any>

    constructor (auth: StatefulChannel<any>) {
        this.auth = auth
    }

    public action (data?: any): void {
        this.auth.dispatch({})
    }
}
