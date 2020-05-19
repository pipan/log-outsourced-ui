import { Resolver } from './Resolver'
import { Channel } from '@/lib/broadcast/Channel'

export class ProjectListResolver implements Resolver {
    private channel: Channel

    public constructor (channel: Channel) {
        this.channel = channel
    }

    public resolve (data?: any): void {
        this.channel.dispatch({ event: 'project@load.all' })
    }
}
