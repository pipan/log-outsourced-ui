import { Controller } from '@/lib/framework'
import { ObservableProperty } from '@wildebeest/observe-changes'
import { ListenerEntity, ProjectEntity } from '@/lib/log-outsourced-api'
import { Channel } from '@/lib/broadcast/Channel'

export class ListenerCloseController implements Controller {
    private listenerUuid: ObservableProperty<string>
    private channel: Channel
    private project: ObservableProperty<ProjectEntity>

    public constructor (listenerUuid: ObservableProperty<string>, channel: Channel, project: ObservableProperty<ProjectEntity>) {
        this.listenerUuid = listenerUuid
        this.channel = channel
        this.project = project
    }

    public action (data?: any): void {
        this.listenerUuid.set('')
        this.channel.dispatch({
            event: 'scene@change',
            data: '/project?pid=' + this.project.get().getUuid()
        })
    }
}
