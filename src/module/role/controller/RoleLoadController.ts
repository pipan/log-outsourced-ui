import { Controller } from '@/lib/framework'
import { Repository } from '@wildebeest/repository'
import { Channel, StatefulChannel } from '@wildebeest/observable'
import { OutsourcedApi } from '@/lib/log-outsourced-api'
import { LoadForProjectController } from '@/module/LoadForProjectController'

export class RoleLoadController implements Controller {
    private repo: Repository<any>
    private api: StatefulChannel<OutsourcedApi>
    private channel: Channel<any>

    public constructor (repo: Repository<any>, api: StatefulChannel<OutsourcedApi>, channel: Channel<any>) {
        this.api = api
        this.repo = repo
        this.channel = channel
    }

    public action (data?: any): void {
        const loadController = new LoadForProjectController(this.repo, this.api.get().roles(), this.channel)

        loadController.action(data)
    }
}
