import { Controller } from '@/lib/framework'
import { ListenerApi, ListenerEntity } from '@/lib/log-outsourced-api'
import { AlertHelper } from '@/module/alert'
import { Repository } from '@wildebeest/repository'
import { Channel } from '@wildebeest/observable'

export class ListenerUpdateController implements Controller {
    private listenerApi: ListenerApi
    private listeners: Repository<ListenerEntity>
    private channel: Channel<any>

    public constructor (listeners: Repository<ListenerEntity>, listenerApi: ListenerApi, channel: Channel<any>) {
        this.listenerApi = listenerApi
        this.listeners = listeners
        this.channel = channel
    }

    public action (data?: any): void {
        const newListener: ListenerEntity = new ListenerEntity(
            data.body.uuid,
            data.body.projectUuid,
            data.body.name,
            data.body.rules,
            data.body.handler.slug,
            data.body.handler.values
        )
        this.listenerApi.update(newListener)
            .then((listenerUpdated: ListenerEntity) => {
                this.listeners.insert(listenerUpdated)
                this.channel.dispatch(
                    AlertHelper.infoEvent('Rule was updated')
                )
                if (data.success) {
                    data.success(listenerUpdated)
                }
            })
            .catch((error: any) => {
                console.error(error)
                this.channel.dispatch(
                    AlertHelper.errorEvent(error)
                )
            })
    }
}
