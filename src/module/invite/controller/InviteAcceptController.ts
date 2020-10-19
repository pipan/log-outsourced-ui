import { Controller } from '@/lib/framework'
import { Alertable } from '@/module/alert'
import { Repository } from '@wildebeest/repository'
import { ConnectionService } from '@/module/connection'
import { ApiFactory } from '@/module/http'

export class InviteAcceptController implements Controller {
    private repo: Repository<any>
    private connectionService: ConnectionService
    private apiFactory: ApiFactory

    public constructor (repo: Repository<any>, connectionService: ConnectionService, apiFactory: ApiFactory) {
        this.repo = repo
        this.connectionService = connectionService
        this.apiFactory = apiFactory
    }

    public action (data?: any): void {
        const host = data.host
        const body = data.body
        const inviteApi = this.apiFactory.create(host)

        const query = this.repo.query()
            .property(body.invite_token)
        const invite = query.get()
        query.close()

        inviteApi.invite().accept(body).then((response: any) => {
            this.repo.remove(invite)
            this.connectionService.create({
                name: host,
                host: host,
                username: invite.username
            })
        })
    }
}
