import { Service } from './service/Service'
import { Broadcast, SwitchableBroadcast } from '@/lib/broadcast'

export class BroadcastService implements Service {
    private broadcastValue: SwitchableBroadcast

    public constructor () {
        this.broadcastValue = new SwitchableBroadcast()
    }

    public start (): void {
        this.broadcastValue.start()
    }

    public stop (): void {
        this.broadcastValue.stop()
    }

    public broadcast (): Broadcast {
        return this.broadcastValue
    }
}
