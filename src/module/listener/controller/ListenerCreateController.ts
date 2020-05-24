import { Controller } from '@/lib/framework'
import { ListenerApi, ListenerEntity, ProjectEntity } from '@/lib/log-outsourced-api'
import { Channel } from '@/lib/broadcast/Channel'
import { AlertHelper } from '@/module/alert'
import { ObservableList, ObservableProperty } from '@wildebeest/observe-changes'

export class ListenerCreateController implements Controller {
    private listenerApi: ListenerApi
    private listeners: ObservableList<ListenerEntity>
    private channel: Channel
    private activeProject: ObservableProperty<ProjectEntity>
    private listenerUuid: ObservableProperty<string>

    public constructor (listenerApi: ListenerApi, channel: Channel, listeners: ObservableList<ListenerEntity>, activeProject: ObservableProperty<ProjectEntity>, listenerUuid: ObservableProperty<string>) {
        this.listenerApi = listenerApi
        this.channel = channel
        this.listeners = listeners
        this.activeProject = activeProject
        this.listenerUuid = listenerUuid
    }

    public action (data?: any): void {
        const listener: ListenerEntity = new ListenerEntity('', data.projectUuid, data.name, data.rules, data.handler.slug, data.handler.values)
        this.listenerApi.create(listener)
            .then((listener: ListenerEntity) => {
                this.listeners.add(listener)
                this.listenerUuid.set(listener.getUuid())
                this.channel.dispatch(
                    AlertHelper.infoEvent('Rule has been created')
                )
                this.channel.dispatch({
                    event: 'scene@change',
                    data: '/project?pid=' + this.activeProject.get().getUuid() + '&rid=' + listener.getUuid()
                })
                this.channel.dispatch({ event: 'listener.create@reset' })
            })
            .catch((error: any) => {
                console.error(error)
                this.channel.dispatch(
                    AlertHelper.errorEvent('Cannot create rule')
                )
            })
    }
}
