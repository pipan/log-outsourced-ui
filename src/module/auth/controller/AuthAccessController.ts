import { Controller } from '@/lib/framework'
import { OutsourcedApi } from '@/lib/log-outsourced-api'
import { Repository } from '@wildebeest/repository'
import { StatefulChannel } from '@wildebeest/observable'

export class AuthAccessController implements Controller {
    private authTokens: Repository<any>
    private api: OutsourcedApi
    private auth: StatefulChannel<any>

    constructor (authTokens: Repository<any>, api: OutsourcedApi, auth: StatefulChannel<any>) {
        this.authTokens = authTokens
        this.api = api
        this.auth = auth
    }

    public action (data?: any): void {
        const body = data.body

        this.api.auth().access(body)
            .then((response: any) => {
                if (response.ok) {
                    this.auth.dispatch({})
                    this.authTokens.insert({
                        id: body.username + '@' + this.api.getHost(),
                        access: response.body.access,
                        refresh: response.body.refresh
                    })
                } else if (response.status === 401) {
                    this.auth.dispatch({
                        error: {
                            status: 401,
                            message: 'Username or password is incorrect'
                        }
                    })
                }
            })
    }
}
