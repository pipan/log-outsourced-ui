import { Resolver } from './Resolver'
import { Channel } from '@/lib/broadcast/Channel'

export class EventResolver implements Resolver {
    private channel: Channel
    private eventName: string

    public constructor (channel: Channel, eventName: string) {
        this.channel = channel
        this.eventName = eventName
    }

    public resolve (data?: any): void {
        this.channel.dispatch({ event: this.eventName })
    }
}
