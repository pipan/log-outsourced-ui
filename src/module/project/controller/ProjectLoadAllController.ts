import { Controller } from '@/lib/framework'
import { OutsourcedApi } from '@/lib/log-outsourced-api'
import { Repository } from '@wildebeest/repository'
import { Channel } from '@wildebeest/observable'
import { Action, ChainAction } from '@/lib/action'
import { UnauthorizedMiddleware, ErrorMiddleware } from '@/lib/log-outsourced-api/http'

export class ProjectLoadAllController implements Controller {
    private projects: Repository<any>
    private api: OutsourcedApi
    // private thenChain: Action<any>
    // private catchChain: Action<any>

    public constructor (projects: Repository<any>, api: OutsourcedApi) {
        this.api = api
        this.projects = projects
        // this.thenChain = new ChainAction([
        //     new UnauthorizedMiddleware(this.channel)
        // ])
        // this.catchChain = new ChainAction([
        //     new ErrorMiddleware(this.channel)
        // ])
    }

    public action (data?: any): void {
        this.api.projects().all()
            // .then(this.thenChain.activate.bind(this.thenChain))
            .then((response: any) => {
                if (response.ok) {
                    this.projects.setAll(response.body.items)
                }
            })
            // .catch(this.catchChain.activate.bind(this.catchChain))
            .catch(() => {
                this.projects.clear()
            })
    }
}
