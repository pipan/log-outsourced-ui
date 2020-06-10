import { Controller } from '@/lib/framework'
import { ListenerApi, ListenerEntity } from '@/lib/log-outsourced-api'
import { AlertHelper } from '@/module/alert'
import { Channel } from '@wildebeest/observable'
import { Repository } from '@wildebeest/repository'

export class ListenerCreateController implements Controller {
    private listenerApi: ListenerApi
    private listeners: Repository<ListenerEntity>
    private channel: Channel<any>

    public constructor (listeners: Repository<ListenerEntity>, listenerApi: ListenerApi, channel: Channel<any>) {
        this.listenerApi = listenerApi
        this.channel = channel
        this.listeners = listeners
    }

    public action (data?: any): void {
        const body = data.body
        const listener: ListenerEntity = new ListenerEntity('', body.projectUuid, body.name, body.rules, body.handler.slug, body.handler.values)
        this.listenerApi.create(listener)
            .then((listener: ListenerEntity) => {
                this.listeners.insert(listener)
                this.channel.dispatch({
                    event: 'listener@open',
                    data: listener
                })
                // this.listenerUuid.set(listener.getUuid())
                this.channel.dispatch(
                    AlertHelper.infoEvent('Rule has been created')
                )
                this.channel.dispatch({ event: 'listener.create@reset' })
                if (data.success) {
                    data.success(listener)
                }
            })
            .catch((error: any) => {
                console.error(error)
                this.channel.dispatch(
                    AlertHelper.errorEvent('Cannot create rule')
                )
            })
    }
}
