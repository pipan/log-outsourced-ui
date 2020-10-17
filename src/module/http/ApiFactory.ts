import { OutsourcedApi, OutsourcedHttpApi } from '@/lib/log-outsourced-api'
import { Channel } from '@wildebeest/observable'

export class ApiFactory {
    private channel: Channel<any>

    constructor (channel: Channel<any>) {
        this.channel = channel
    }

    public create (host: string, tokens: any = {}): OutsourcedApi {
        const api = new OutsourcedHttpApi(host, tokens)
        api.connectFn((event: any) => {
            const status = event.type === 'error' ? 'error' : event.response.status
            this.channel.dispatch({
                status: status,
                response: event.response
            })
        })
        return api
    }
}
