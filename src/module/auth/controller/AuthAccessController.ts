import { Controller } from '@/lib/framework'
import { OutsourcedApi } from '@/lib/log-outsourced-api'
import { Repository } from '@wildebeest/repository'
import { StatefulChannel } from '@wildebeest/observable'

export class AuthAccessController implements Controller {
    private authTokens: Repository<any>
    private api: StatefulChannel<OutsourcedApi>
    private auth: StatefulChannel<any>

    constructor (authTokens: Repository<any>, api: StatefulChannel<OutsourcedApi>, auth: StatefulChannel<any>) {
        this.authTokens = authTokens
        this.api = api
        this.auth = auth
    }

    public action (data?: any): void {
        const outsourcedApi = this.api.get()
        if (!outsourcedApi) {
            console.error('Cannot login: API is not available.')
            return
        }
        const body = data.body

        outsourcedApi.auth().access(body)
            .then((response: any) => {
                this.auth.dispatch({})
                this.authTokens.insert({
                    id: body.username + '@' + outsourcedApi.getHost(),
                    access: response.body.access,
                    refresh: response.body.refresh
                })
            }).catch((err: any) => {
                console.log('auth error', err)
            })
    }
}
