import { Broadcast } from '../Broadcast'
import { Channel } from '../Channel'
import { SwitchableChannel } from './SwitchableChannel'

export class SwitchableBroadcast implements Broadcast {
    protected channels!: Map<string, SwitchableChannel>
    protected isOn = true

    public constructor () {
        this.channels = new Map()
    }

    public channel (name: string): Channel {
        if (!this.channels.has(name)) {
            this.channels.set(name, new SwitchableChannel(this.isOn))
        }
        return this.channels.get(name)!
    }

    public start (): void {
        this.isOn = true
        this.channels.forEach((channel) => {
            channel.start()
        })
    }

    public stop (): void {
        this.isOn = false
        this.channels.forEach((channel) => {
            channel.stop()
        })
    }
}
