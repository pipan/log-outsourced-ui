import { Controller } from '@/lib/framework'
import { Channel } from '@/lib/broadcast/Channel'
import { ObservableProperty, ObservableList } from '@wildebeest/observe-changes'
import { ProjectEntity, ListenerEntity } from '@/lib/log-outsourced-api'

export class ProjectCloseController implements Controller {
    private channel: Channel
    private activeProject: ObservableProperty<ProjectEntity>

    public constructor (channel: Channel, activeProjec: ObservableProperty<ProjectEntity>) {
        this.channel = channel
        this.activeProject = activeProjec
    }

    public action (data?: any): void {
        this.channel.dispatch({ event: 'project@load.all' })
        this.channel.dispatch({ event: 'listener@set.all', data: [] })
        this.channel.dispatch({
            event: 'scene@change',
            data: '/'
        })
    }
}
