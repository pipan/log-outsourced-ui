import { Controller } from '@/lib/framework'
import { OutsourcedApi } from '@/lib/log-outsourced-api'
import { Repository } from '@wildebeest/repository'
import { Channel } from '@wildebeest/observable'
import { CreateController } from '@/module/CreateController'

export class RoleCreateController implements Controller {
    private repo: Repository<any>
    private channel: Channel<any>
    private api: OutsourcedApi

    public constructor (
        repo: Repository<any>,
        api: OutsourcedApi,
        channel: Channel<any>
    ) {
        this.repo = repo
        this.channel = channel
        this.api = api
    }

    public action (data?: any): void {
        // const createController = new CreateController(this.repo, this.api.roles(), this.channel)

        // createController.action(data)
    }
}
