import { Controller } from '@/lib/framework'
import { Repository } from '@wildebeest/repository'
import { OutsourcedHttpApi, OutsourcedProxyApi } from '@/lib/log-outsourced-api'

export class ConnectionOpenController implements Controller {
    private api: OutsourcedProxyApi
    private repo: Repository<any>
    private authTokens: Repository<any>

    public constructor (repo: Repository<any>, api: OutsourcedProxyApi, authTokens: Repository<any>) {
        this.repo = repo
        this.api = api
        this.authTokens = authTokens
    }

    public action (data?: any): void {
        let result = this.repo.query()
            .property(data)

        const connection = result.get()
        result.close()
        if (!connection) {
            return
        }

        result = this.authTokens.query()
            .property(connection.username + '@' + connection.host)

        const token = result.get() || {}
        result.close()

        this.api.set(new OutsourcedHttpApi(connection.host, token))
    }
}
