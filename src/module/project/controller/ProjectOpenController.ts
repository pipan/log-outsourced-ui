import { Controller } from '@/lib/framework'
import { ObservableProperty } from '@wildebeest/observe-changes'
import { ProjectEntity } from '@/lib/log-outsourced-api'
import { Channel } from '@/lib/broadcast/Channel'

export class ProjectOpenController implements Controller {
    private active: ObservableProperty<ProjectEntity>
    private channel: Channel

    public constructor (active: ObservableProperty<ProjectEntity>, channel: Channel) {
        this.active = active
        this.channel = channel
    }

    public action (data?: any): void {
        this.active.set(data)
        this.channel.dispatch({
            event: 'scene@change',
            data: '/project/' + data.getUuid()
        })
    }
}
