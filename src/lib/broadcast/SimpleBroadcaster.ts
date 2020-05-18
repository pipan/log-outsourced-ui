import { Channel } from './Channel'
import { Broadcaster } from './Broadcaster'

export class SimpleBroadcaster implements Broadcaster {
    private channels!: Map<string, Channel>

    public constructor () {
        this.channels = new Map()
    }

    public getChannel (name: string): Channel {
        if (!this.channels.has(name)) {
            this.channels.set(name, new Channel())
        }
        return this.channels.get(name)!
    }

    public getChannels (): Map<string, Channel> {
        return this.channels
    }
}
