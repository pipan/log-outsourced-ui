import { Controller } from '@/lib/framework'
import { OutsourcedApi } from '@/lib/log-outsourced-api'
import { Repository } from '@wildebeest/repository'
import { FormValidator } from '@/module/form'
import { StatefulChannel } from '@wildebeest/observable'

export class AuthAccessController implements Controller {
    private authTokens: Repository<any>
    private api: OutsourcedApi
    private error: StatefulChannel<any>

    constructor (authTokens: Repository<any>, api: OutsourcedApi, error: StatefulChannel<any>) {
        this.authTokens = authTokens
        this.api = api
        this.error = error
    }

    public action (data?: any): void {
        const body = data.body

        this.api.auth().access(body)
            .then((response: any) => {
                if (response.ok) {
                    this.authTokens.insert({
                        id: body.username + '@' + this.api.getHost(),
                        access: response.body.access,
                        refresh: response.body.refresh
                    })

                    if (data.success) {
                        data.success()
                    }
                } else {
                    if (response.status === 401) {
                        this.error.dispatch({
                            status: 401,
                            message: 'Username or password is incorrect'
                        })
                    }
                }
            })
    }
}
