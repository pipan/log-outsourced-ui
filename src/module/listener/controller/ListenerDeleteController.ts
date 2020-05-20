import { Controller } from '@/lib/framework'
import { ObservableList } from '@wildebeest/observe-changes'
import { ListenerEntity, ListenerApi } from '@/lib/log-outsourced-api'
import { Channel } from '@/lib/broadcast/Channel'
import { AlertHelper } from '@/module/alert'

export class ListenerDeleteController implements Controller {
    private listners: ObservableList<ListenerEntity>
    private listnerApi: ListenerApi
    private channel: Channel

    public constructor (listeners: ObservableList<ListenerEntity>, listenerApi: ListenerApi, channel: Channel) {
        this.listnerApi = listenerApi
        this.listners = listeners
        this.channel = channel
    }

    public action (listener: ListenerEntity): void {
        this.listnerApi.delete(listener)
            .then(() => {
                this.listners.remove(listener)
                this.channel.dispatch(
                    AlertHelper.successEvent('Rule has been removed')
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
