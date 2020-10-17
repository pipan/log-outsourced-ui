import { Controller } from '@/lib/framework'
import { Repository } from '@wildebeest/repository'
import { OutsourcedProxyApi } from '@/lib/log-outsourced-api'
import { ApiFactory } from '../ApiFactory'

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
        let result = this.repo.query()
            .property(data)

        const connection = result.get()
        result.close()
        if (!connection) {
            this.api.set(
                this.factory.create('')
            )
            return
        }

        result = this.authTokens.query()
            .property(connection.username + '@' + connection.host)

        const token = result.get() || {}
        result.close()

        this.api.set(
            this.factory.create(connection.host, token)
        )
    }
}
