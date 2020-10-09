import { Controller } from '@/lib/framework'
import { Repository } from '@wildebeest/repository'
import { StatefulChannel } from '@wildebeest/observable'
import { OutsourcedApi, OutsourcedHttpApi } from '@/lib/log-outsourced-api'

export class ConnectionOpenController implements Controller {
    private connection: StatefulChannel<any>
    private api: StatefulChannel<OutsourcedApi>
    private repo: Repository<any>
    private authTokens: any

    public constructor (connection: StatefulChannel<any>, repo: Repository<any>, api: StatefulChannel<OutsourcedApi>, authTokens: any) {
        this.connection = connection
        this.repo = repo
        this.api = api
        this.authTokens = authTokens
    }

    public action (data?: any): void {
        let result = this.repo.query()
            .property(data)

        let connection = result.get()
        result.close()
        if (!connection) {
            connection = {
                id: data,
                error: {
                    status: 404,
                    message: 'Connection not found'
                }
            }
            this.connection.dispatch(connection)
            return
        }

        result = this.authTokens.query()
            .property(connection.username + '@' + connection.host)

        const token = result.get() || {}
        result.close()

        this.connection.dispatch(connection)
        this.api.dispatch(new OutsourcedHttpApi(connection.host, token))
    }
}
