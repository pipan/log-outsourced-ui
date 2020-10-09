import { Action } from '@/lib/action'
import { Channel } from '@wildebeest/observable'

export class UnauthorizedMiddleware implements Action<any> {
    private channel: Channel<any>

    constructor (channel: Channel<any>) {
        this.channel = channel
    }

    public activate (data: any): any {
        if (data.status !== 401) {
            return data
        }
        this.channel.dispatch({
            event: 'error@401'
        })
        return data
    }
}
