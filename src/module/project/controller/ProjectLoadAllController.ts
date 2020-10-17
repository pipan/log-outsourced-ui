import { Controller } from '@/lib/framework'
import { OutsourcedApi } from '@/lib/log-outsourced-api'
import { Repository } from '@wildebeest/repository'

export class ProjectLoadAllController implements Controller {
    private projects: Repository<any>
    private api: OutsourcedApi

    public constructor (projects: Repository<any>, api: OutsourcedApi) {
        this.api = api
        this.projects = projects
    }

    public action (data?: any): void {
        this.api.projects().all()
            .then((response: any) => {
                if (response.ok) {
                    this.projects.setAll(response.body.items)
                }
            })
            .catch(() => {
                this.projects.clear()
            })
    }
}
