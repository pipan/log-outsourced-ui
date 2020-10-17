import { Controller } from '@/lib/framework'
import { StatefulChannel } from '@wildebeest/observable'

export class UnauthorizedController implements Controller {
    private auth: StatefulChannel<any>

    public constructor (auth: StatefulChannel<any>) {
        this.auth = auth
    }

    public action (data?: any): void {
        console.log('unauthorized', data)
        this.auth.dispatch({
            error: {
                status: 401
            }
        })
    }
}
