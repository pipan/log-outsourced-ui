import { Controller } from '@/lib/framework'
import { StatefulChannel } from '@wildebeest/observable'

export class CloseConnectionController implements Controller {
    private error: StatefulChannel<any>

    public constructor (error: StatefulChannel<any>) {
        this.error = error
    }

    public action (data?: any): void {
        this.error.dispatch(null)
    }
}
