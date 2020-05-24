import { Resolver } from './Resolver'
import { Channel } from '@/lib/broadcast/Channel'
import { Closable, ObservableList } from '@wildebeest/observe-changes'
import { ListenerEntity } from '@/lib/log-outsourced-api'

export class ProjectDetailResolver implements Resolver {
    private channel: Channel
    private listeners: ObservableList<ListenerEntity>
    private loadListenerUuid = ''
    private listenersClosable!: Closable

    public constructor (channel: Channel, listeners: ObservableList<ListenerEntity>) {
        this.channel = channel
        this.listeners = listeners
    }

    public resolve (params?: any): void {
        if (params.listenerUuid) {
            this.loadListenerUuid = params.listenerUuid
            this.listenersClosable = this.listeners.addListener(() => {
                this.listenersClosable.close()
                for (const listener of this.listeners.all()) {
                    if (listener.getUuid() !== this.loadListenerUuid) {
                        continue
                    }
                    this.channel.dispatch({
                        event: 'listener@open',
                        data: listener
                    })
                }
            })
        }
        this.channel.dispatch({
            event: 'project@load',
            data: params.uuid
        })
    }
}
