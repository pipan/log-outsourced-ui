import { Controller } from '@/lib/framework'
import { ObservableProperty } from '@wildebeest/observe-changes'
import { ListenerEntity, ProjectEntity } from '@/lib/log-outsourced-api'
import { Channel } from '@/lib/broadcast/Channel'

export class ListenerOpenController implements Controller {
    private listener: ObservableProperty<ListenerEntity>
    private channel: Channel
    private project: ObservableProperty<ProjectEntity>

    public constructor (listener: ObservableProperty<ListenerEntity>, channel: Channel, project: ObservableProperty<ProjectEntity>) {
        this.listener = listener
        this.channel = channel
        this.project = project
    }

    public action (data: ListenerEntity): void {
        this.listener.set(data)
        this.channel.dispatch({
            event: 'scene@change',
            data: '/project/' + this.project.get().getUuid() + '/' + data.getUuid()
        })
    }
}
