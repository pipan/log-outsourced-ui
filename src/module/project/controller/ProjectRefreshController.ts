import { Controller } from '@/lib/framework'
import { ObservableProperty } from '@wildebeest/observe-changes'
import { ProjectEntity } from '@/lib/log-outsourced-api'
import { Channel } from '@/lib/broadcast/Channel'

export class ProjectRefreshController implements Controller {
    private active: ObservableProperty<ProjectEntity>
    private channel: Channel

    public constructor (active: ObservableProperty<ProjectEntity>, channel: Channel) {
        this.active = active
        this.channel = channel
    }

    public action (): void {
        this.channel.dispatch({
            event: 'project@load',
            data: this.active.get().getUuid()
        })
    }
}
