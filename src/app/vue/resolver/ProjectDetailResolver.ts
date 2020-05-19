import { Resolver } from './Resolver'
import { Channel } from '@/lib/broadcast/Channel'

export class ProjectDetailResolver implements Resolver {
    private channel: Channel

    public constructor (channel: Channel) {
        this.channel = channel
    }

    public resolve (params?: any): void {
        this.channel.dispatch({
            event: 'project@open',
            data: params.uuid
        })
    }
}
