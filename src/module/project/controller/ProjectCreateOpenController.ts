import { Controller } from '@/lib/framework'
import { Channel } from '@/lib/broadcast/Channel'

export class ProjectCreateOpenController implements Controller {
    private channel: Channel

    public constructor (channel: Channel) {
        this.channel = channel
    }

    public action (data?: any): void {
        this.channel.dispatch({
            event: 'scene@change',
            data: '/create'
        })
    }
}
