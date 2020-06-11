import { Broadcaster } from './Broadcaster'
import { Channel, ProxyChannel } from '@wildebeest/observable'

export class SimpleBroadcaster implements Broadcaster<any> {
    private channels!: Map<string, Channel<any>>

    public constructor () {
        this.channels = new Map()
    }

    public getChannel (name: string): Channel<any> {
        if (!this.channels.has(name)) {
            this.channels.set(name, new ProxyChannel())
        }
        return this.channels.get(name)!
    }

    public broadcast (name: string, event: any): void {
        if (!this.channels.has(name)) {
            console.warn('Cannot broadcast on non existing channel: ' + name)
            return
        }
        this.getChannel(name).dispatch(event)
    }

    public getChannels (): Map<string, Channel<any>> {
        return this.channels
    }
}
