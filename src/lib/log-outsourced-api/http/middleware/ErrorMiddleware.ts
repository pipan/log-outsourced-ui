import { Action } from '@/lib/action'
import { Channel } from '@wildebeest/observable'

export class ErrorMiddleware implements Action<any> {
    private channel: Channel<any>

    constructor (channel: Channel<any>) {
        this.channel = channel
    }

    public activate (data: any): any {
        this.channel.dispatch({
            event: 'connection@error',
            data: {
                status: 'Error',
                message: 'Cannot connect to server'
            }
        })
        return data
    }
}
