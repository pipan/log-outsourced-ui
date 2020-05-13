import { Listener } from '@/lib/broadcast/Listener'
import { Broadcast } from '@/lib/broadcast'

export class ProjectCreateListener implements Listener {
    private broadcast: Broadcast

    public constructor (broadcast: Broadcast) {
        this.broadcast = broadcast
    }

    public handle (data: any): void {
        this.broadcast.channel('route.change')
            .dispatch('/create')
    }
}
