import { Controller } from '@/lib/framework'
import { ListenerApi, ListenerEntity, ProjectApi } from '@/lib/log-outsourced-api'
import { ObservableList, ObservableProperty } from '@wildebeest/observe-changes'
import { Channel } from '@/lib/broadcast/Channel'
import { AlertHelper } from '@/module/alert'

export class ListenerUpdateController implements Controller {
    private listenerApi: ListenerApi
    private listener: ObservableProperty<ListenerEntity>
    private channel: Channel

    public constructor (listenerApi: ListenerApi, listener: ObservableProperty<ListenerEntity>, channel: Channel) {
        this.listenerApi = listenerApi
        this.listener = listener
        this.channel = channel
    }

    public action (data?: any): void {
        const newListener: ListenerEntity = new ListenerEntity(
            this.listener.get().getUuid(),
            this.listener.get().getProjecUuid(),
            data.name,
            data.rules,
            data.handler.slug,
            data.handler.values
        )
        this.listenerApi.update(newListener)
            .then((listenerUpdated: ListenerEntity) => {
                this.listener.set(listenerUpdated)
                this.channel.dispatch({ event: 'project@refresh' })
                this.channel.dispatch(
                    AlertHelper.infoEvent('Rule was updated')
                )
            })
            .catch((error: any) => {
                console.error(error)
            })
    }
}
