import { Controller } from '@/lib/framework'
import { ListenerEntity, ListenerApi } from '@/lib/log-outsourced-api'
import { AlertHelper } from '@/module/alert'
import { Repository } from '@wildebeest/repository'
import { Channel } from '@wildebeest/observable'

export class ListenerDeleteController implements Controller {
    private listners: Repository<ListenerEntity>
    private listnerApi: ListenerApi
    private channel: Channel<any>

    public constructor (listeners: Repository<ListenerEntity>, listenerApi: ListenerApi, channel: Channel<any>) {
        this.listnerApi = listenerApi
        this.listners = listeners
        this.channel = channel
    }

    public action (listener: ListenerEntity): void {
        this.listnerApi.delete(listener)
            .then(() => {
                this.listners.remove(listener)
                this.channel.dispatch(
                    AlertHelper.infoEvent('Rule has been removed')
                )
            })
            .catch((error: any) => {
                console.error(error)
                this.channel.dispatch(
                    AlertHelper.errorEvent('Cannot remove rule')
                )
            })
    }
}
