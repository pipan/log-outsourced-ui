import { Controller } from '@/lib/framework'
import { Repository } from '@wildebeest/repository'
import { ApiFactory } from '@/module/http'

export class InviteLoadController implements Controller {
    private repo: Repository<any>
    private apiFactory: ApiFactory

    public constructor (repo: Repository<any>, apiFactory: ApiFactory) {
        this.repo = repo
        this.apiFactory = apiFactory
    }

    public action (data?: any): void {
        const token = data.body
        const inviteApi = this.apiFactory.create(data.host)

        inviteApi.invite().load(token).then((response: any) => {
            this.repo.insert(response.body)
        })
    }
}
