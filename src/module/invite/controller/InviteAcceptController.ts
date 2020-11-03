import { Controller } from '@/lib/framework'
import { Alertable } from '@/module/alert'
import { Repository } from '@wildebeest/repository'
import { ConnectionService } from '@/module/connection'
import { ApiFactory } from '@/module/http'
import { Host } from '@/module/Host'

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
        const name = data.host
        const host = Host.fromConnectionHost(data.host)
        const body = data.body
        const inviteApi = this.apiFactory.create(host)

        const query = this.repo.query()
            .property(body.invite_token)
        const invite = query.get()
        query.close()

        inviteApi.invite().accept(body)
            .then((response: any) => {
                this.repo.remove(invite)
                this.connectionService.create({
                    name: name,
                    host: name,
                    username: invite.username
                })
                if (data.success) {
                    data.success()
                }
            })
    }
}
