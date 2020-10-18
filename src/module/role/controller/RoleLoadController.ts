import { Controller } from '@/lib/framework'
import { Repository } from '@wildebeest/repository'
import { OutsourcedApi } from '@/lib/log-outsourced-api'
import { LoadForProjectController } from '@/module/LoadForProjectController'

export class RoleLoadController implements Controller {
    private repo: Repository<any>
    private api: OutsourcedApi

    public constructor (repo: Repository<any>, api: OutsourcedApi) {
        this.api = api
        this.repo = repo
    }

    public action (data?: any): void {
        const loadController = new LoadForProjectController(this.repo, () => this.api.roles())

        loadController.action(data)
    }
}
