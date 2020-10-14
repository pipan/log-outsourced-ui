import { Controller } from '@/lib/framework'
import { OutsourcedApi } from '@/lib/log-outsourced-api'
import { Repository } from '@wildebeest/repository'
import { Channel } from '@wildebeest/observable'
import { Action, ChainAction } from '@/lib/action'
import { UnauthorizedMiddleware, ErrorMiddleware } from '@/lib/log-outsourced-api/http'

export class AdministratorDeleteController implements Controller {
    private admins: Repository<any>
    private api: OutsourcedApi
    private channel: Channel<any>
    private thenChain: Action<any>
    private catchChain: Action<any>

    public constructor (admins: Repository<any>, api: OutsourcedApi, channel: Channel<any>) {
        this.api = api
        this.admins = admins
        this.channel = channel
        this.thenChain = new ChainAction([
            new UnauthorizedMiddleware(this.channel)
        ])
        this.catchChain = new ChainAction([
            new ErrorMiddleware(this.channel)
        ])
    }

    public action (data?: any): void {
        this.api.administrators().delete(data.body)
            .then(this.thenChain.activate.bind(this.thenChain))
            .then((response: any) => {
                if (response.ok) {
                    this.admins.remove(data.body)
                }
            })
            .catch(this.catchChain.activate.bind(this.catchChain))
            .catch(() => {
                this.admins.clear()
            })
    }
}
