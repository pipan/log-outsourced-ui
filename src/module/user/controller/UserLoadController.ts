import { Controller } from '@/lib/framework'
import { OutsourcedApi } from '@/lib/log-outsourced-api'
import { Repository } from '@wildebeest/repository'
import { Channel, StatefulChannel } from '@wildebeest/observable'
import { Action, ChainAction } from '@/lib/action'
import { UnauthorizedMiddleware, ErrorMiddleware } from '@/lib/log-outsourced-api/http'

export class UserLoadController implements Controller {
    private repo: Repository<any>
    private api: StatefulChannel<OutsourcedApi>
    private channel: Channel<any>
    private thenChain: Action<any>
    private catchChain: Action<any>

    public constructor (repo: Repository<any>, api: StatefulChannel<OutsourcedApi>, channel: Channel<any>) {
        this.api = api
        this.repo = repo
        this.channel = channel
        this.thenChain = new ChainAction([
            new UnauthorizedMiddleware(this.channel)
        ])
        this.catchChain = new ChainAction([
            new ErrorMiddleware(this.channel)
        ])
    }

    public action (data?: any): void {
        const outsourcedApi = this.api.get()
        if (!outsourcedApi) {
            console.error('Cannot load users: API is not available.')
            return
        }

        outsourcedApi.users().all(data)
            .then(this.thenChain.activate.bind(this.thenChain))
            .then((response: any) => {
                if (response.ok) {
                    this.repo.setAll(response.body.items)
                }
            })
            .catch(this.catchChain.activate.bind(this.catchChain))
            .catch(() => {
                this.repo.clear()
            })
    }
}
