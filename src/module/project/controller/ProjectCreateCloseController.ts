import { Controller } from '@/lib/framework'
import { ObservableProperty } from '@wildebeest/observe-changes'
import { Channel } from '@/lib/broadcast/Channel'

export class ProjectCreateCloseController implements Controller {
    private channel: Channel

    public constructor (channel: Channel) {
        this.channel = channel
    }

    public action (data?: any): void {
        this.channel.dispatch({ event: 'project@all' })
    }
}
