import { Controller } from '@/lib/framework'
import { Repository } from '@wildebeest/repository'
import { DefaultRoleApi } from '@/lib/log-outsourced-api'
import { Alertable } from '@/module/alert'

export class SaveController implements Controller {
    private repo: Repository<any>
    private httpFactory: () => DefaultRoleApi
    private alertable: Alertable

    public constructor (repo: Repository<any>, httpFactory: () => DefaultRoleApi, alertable: Alertable) {
        this.httpFactory = httpFactory
        this.repo = repo
        this.alertable = alertable
    }

    public action (data?: any): void {
        this.httpFactory().save(data.body.project_uuid, data.body.roles)
            .then((response: any) => {
                if (response.ok) {
                    this.repo.setAll(response.body.items)
                    this.alertable.success('')
                }
            })
    }
}
