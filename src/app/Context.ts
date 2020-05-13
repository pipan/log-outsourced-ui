import { Broadcast } from '@/lib/broadcast'

export class Context {
    private broadcastValue: Broadcast

    public constructor (
        broadcastValue: Broadcast
    ) {
        this.broadcastValue = broadcastValue
    }

    public broadcast (): Broadcast {
        return this.broadcastValue
    }
}
