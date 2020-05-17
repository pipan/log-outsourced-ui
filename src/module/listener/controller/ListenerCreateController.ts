import { Controller } from '@/lib/framework'
import { ListenerApi, ListenerEntity } from '@/lib/log-outsourced-api'
import { Channel } from '@/lib/broadcast/Channel'
import { AlertHelper } from '@/module/alert'

export class ListenerCreateController implements Controller {
    private listenerApi: ListenerApi
    private channel: Channel

    public constructor (listenerApi: ListenerApi, channel: Channel) {
        this.listenerApi = listenerApi
        this.channel = channel
    }

    public action (data?: any): void {
        const listener: ListenerEntity = new ListenerEntity('', data.projectUuid, data.name, [], {})
        this.listenerApi.create(listener)
            .then((listener: ListenerEntity) => {
                console.log('success', listener)
            })
            .catch((error: any) => {
                console.log(error)
                this.channel.dispatch(
                    AlertHelper.errorEvent('Cannot create rule')
                )
            })
    }
}
