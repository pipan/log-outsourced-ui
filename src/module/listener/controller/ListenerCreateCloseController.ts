import { Controller } from '@/lib/framework'
import { Channel } from '@/lib/broadcast/Channel'
import { ObservableProperty } from '@wildebeest/observe-changes'
import { ProjectEntity } from '@/lib/log-outsourced-api'

export class ListenerCreateCloseController implements Controller {
    private channel: Channel
    private project: ObservableProperty<ProjectEntity>
    private listnerUuid: ObservableProperty<string>

    public constructor (channel: Channel, project: ObservableProperty<ProjectEntity>, listenerUuid: ObservableProperty<string>) {
        this.channel = channel
        this.project = project
        this.listnerUuid = listenerUuid
    }

    public action (data?: any): void {
        let query: string = 'pid=' + this.project.get().getUuid()
        if (this.listnerUuid.get() !== '') {
            query += '&rid=' + this.listnerUuid.get()
        }

        this.channel.dispatch({
            event: 'scene@change',
            data: '/project?' + query
        })
    }
}
