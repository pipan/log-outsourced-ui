import { Controller } from '@/lib/framework'
import { AlertHelper } from '@/module/alert'
import { Channel } from '@wildebeest/observable'
import { Repository } from '@wildebeest/repository'
import { InviteHttpApi } from '@/lib/log-outsourced-api'

export class InviteLoadController implements Controller {
    private invites: Repository<any>
    private channel: Channel<any>

    public constructor (invites: Repository<any>, channel: Channel<any>) {
        this.invites = invites
        this.channel = channel
    }

    public action (data?: any): void {
        const host = data.host
        const token = data.body

        const inviteApi = new InviteHttpApi(host)

        inviteApi.load(token).then((response: any) => {
            this.invites.insert(response.body)
        }).catch((ex) => {
            this.channel.dispatch(
                AlertHelper.errorEvent('Cannot contact host: ' + host)
            )
        })
    }
}
