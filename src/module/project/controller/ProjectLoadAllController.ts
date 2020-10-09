import { Controller } from '@/lib/framework'
import { OutsourcedApi } from '@/lib/log-outsourced-api'
import { Repository } from '@wildebeest/repository'
import { Channel, StatefulChannel } from '@wildebeest/observable'
import { Action, ChainAction } from '@/lib/action'
import { UnauthorizedMiddleware, ErrorMiddleware } from '@/lib/log-outsourced-api/http'

export class ProjectLoadAllController implements Controller {
    private projects: Repository<any>
    private api: StatefulChannel<OutsourcedApi>
    private channel: Channel<any>
    private thenChain: Action<any>
    private catchChain: Action<any>

    public constructor (projects: Repository<any>, api: StatefulChannel<OutsourcedApi>, channel: Channel<any>) {
        this.api = api
        this.projects = projects
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
            console.error('Cannot load projects: API is not available.')
            return
        }

        outsourcedApi.projects().all()
            .then(this.thenChain.activate.bind(this.thenChain))
            .then((response: any) => {
                console.log('project load all', response)
                if (response.ok) {
                    this.projects.setAll(response.body.items)
                }
            })
            .catch(this.catchChain.activate.bind(this.catchChain))
            .catch(() => {
                this.projects.clear()
            })
    }
}
