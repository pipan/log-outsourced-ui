import { Channel } from './Channel'
import { Broadcast } from './Broadcast'

export class SimpleBroadcast implements Broadcast {
    private channels!: Map<string, Channel>

    public constructor () {
        this.channels = new Map()
    }

    public channel (name: string): Channel {
        if (!this.channels.has(name)) {
            this.channels.set(name, new Channel())
        }
        return this.channels.get(name)!
    }

    public getChannels (): Map<string, Channel> {
        return this.channels
    }
}
