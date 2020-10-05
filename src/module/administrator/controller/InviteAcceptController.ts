import { Controller } from '@/lib/framework'
import { AlertHelper } from '@/module/alert'
import { Channel } from '@wildebeest/observable'
import { Repository } from '@wildebeest/repository'
import { InviteHttpApi } from '@/lib/log-outsourced-api'

export class InviteAcceptController implements Controller {
    private invites: Repository<any>
    private channel: Channel<any>

    public constructor (invites: Repository<any>, channel: Channel<any>) {
        this.invites = invites
        this.channel = channel
    }

    public action (data?: any): void {
        const host = data.host
        const body = data.body

        const inviteApi = new InviteHttpApi(host)
        const query = this.invites.query()
            .property(body.invite_token)
        const invite = query.get()
        query.close()

        inviteApi.accept(body).then((response: any) => {
            console.log('accept', response)
            this.invites.remove(invite)
            this.channel.dispatch({
                event: 'connection@create',
                data: {
                    body: {
                        name: host,
                        host: host,
                        username: invite.username
                    }
                }
            })
        }).catch((ex) => {
            this.channel.dispatch(
                AlertHelper.errorEvent('Cannot contact host: ' + host)
            )
        })
    }
}
