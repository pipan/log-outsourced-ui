import { Controller } from '@/lib/framework'
import { Channel } from '@/lib/broadcast/Channel'
import { ObservableProperty } from '@wildebeest/observe-changes'
import { ProjectEntity } from '@/lib/log-outsourced-api'

export class ProjectCloseController implements Controller {
    private channel: Channel
    private project: ObservableProperty<ProjectEntity | null>

    public constructor (channel: Channel, project: ObservableProperty<ProjectEntity>) {
        this.channel = channel
        this.project = project
    }

    public action (): void {
        this.project.set(null)
        this.channel.dispatch({
            event: 'listener@set.all',
            data: []
        })

        this.channel.dispatch({
            event: 'scene@change',
            data: '/'
        })
    }
}
