import { Controller } from '@/lib/framework'
import { Alertable } from '@/module/alert'
import { Repository } from '@wildebeest/repository'
import { InviteHttpApi } from '@/lib/log-outsourced-api'
import { ConnectionService } from '@/module/connection'

export class InviteAcceptController implements Controller {
    private repo: Repository<any>
    private connectionService: ConnectionService
    private alertable: Alertable

    public constructor (repo: Repository<any>, connectionService: ConnectionService, alertable: Alertable) {
        this.repo = repo
        this.connectionService = connectionService
        this.alertable = alertable
    }

    public action (data?: any): void {
        const host = data.host
        const body = data.body

        const inviteApi = new InviteHttpApi(host)
        const query = this.repo.query()
            .property(body.invite_token)
        const invite = query.get()
        query.close()

        inviteApi.accept(body).then((response: any) => {
            this.repo.remove(invite)
            this.connectionService.create({
                name: host,
                host: host,
                username: invite.username
            })
        }).catch((ex) => {
            console.error(ex)
            this.alertable.error('Cannot contact host: ' + host)
        })
    }
}
