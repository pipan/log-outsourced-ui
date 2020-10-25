import { Controller } from '@/lib/framework'
import { Repository } from '@wildebeest/repository'
import { OutsourcedProxyApi } from '@/lib/log-outsourced-api'
import { ApiFactory } from '../ApiFactory'
import { Host } from '@/module/Host'

export class OpenController implements Controller {
    private api: OutsourcedProxyApi
    private repo: Repository<any>
    private authTokens: Repository<any>
    private factory: ApiFactory

    public constructor (repo: Repository<any>, api: OutsourcedProxyApi, authTokens: Repository<any>, factory: ApiFactory) {
        this.repo = repo
        this.api = api
        this.authTokens = authTokens
        this.factory = factory
    }

    public action (data?: any): void {
        const connection = this.repo.query()
            .property(data)
            .imidiate()

        if (!connection) {
            this.api.set(
                this.factory.create('')
            )
            return
        }

        const host = Host.fromConnection(connection)

        const token = this.authTokens.query()
            .property(connection.username + '@' + host)
            .imidiate() || {}

        this.api.set(
            this.factory.create(host, token)
        )
    }
}
