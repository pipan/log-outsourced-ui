import { Controller } from '@/lib/framework'
import { Channel } from '@/lib/broadcast/Channel'
import { ObservableProperty } from '@wildebeest/observe-changes'
import { ProjectEntity } from '@/lib/log-outsourced-api'

export class ListenerCreateCloseController implements Controller {
    private channel: Channel
    private activeProject: ObservableProperty<ProjectEntity>

    public constructor (channel: Channel, activeProject: ObservableProperty<ProjectEntity>) {
        this.channel = channel
        this.activeProject = activeProject
    }

    public action (data?: any): void {
        this.channel.dispatch({
            event: 'scene@change',
            data: '/project/' + this.activeProject.get()?.getUuid()
        })
    }
}
