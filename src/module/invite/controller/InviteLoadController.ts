import { Controller } from '@/lib/framework'
import { Repository } from '@wildebeest/repository'
import { InviteHttpApi } from '@/lib/log-outsourced-api'
import { Alertable } from '@/module/alert'

export class InviteLoadController implements Controller {
    private repo: Repository<any>
    private alertable: Alertable

    public constructor (repo: Repository<any>, alertable: Alertable) {
        this.repo = repo
        this.alertable = alertable
    }

    public action (data?: any): void {
        const host = data.host
        const token = data.body

        const inviteApi = new InviteHttpApi(host)

        inviteApi.load(token).then((response: any) => {
            this.repo.insert(response.body)
        }).catch((ex) => {
            console.error(ex)
            this.alertable.error('Cannot contact host: ' + host)
        })
    }
}
