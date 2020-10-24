import { Controller } from '@/lib/framework'
import { Repository } from '@wildebeest/repository'
import { OutsourcedApi } from '@/lib/log-outsourced-api'

export class ProjectOpenController implements Controller {
    private api: OutsourcedApi
    private repo: Repository<any>

    public constructor (repo: Repository<any>, api: OutsourcedApi) {
        this.repo = repo
        this.api = api
    }

    public action (data: string): void {
        const project = this.repo.query()
            .property(data)
            .imidiate()

        if (!project) {
            this.repo.insert({
                uuid: data,
                loading: true
            })
        }

        this.api.projects().get(data)
            .then((response: any) => {
                if (!response.ok) {
                    return
                }
                this.repo.insert(response.body)
            })
    }
}
