import { Controller } from '@/lib/framework'
import { StatefulChannel } from '@wildebeest/observable'
import { Repository } from '@wildebeest/repository'

export class ProjectOpenController implements Controller {
    private api: StatefulChannel<any>
    private repo: Repository<any>

    public constructor (repo: Repository<any>, api: StatefulChannel<any>) {
        this.repo = repo
        this.api = api
    }

    public action (data: string): void {
        const outsourcedApi = this.api.get()
        if (!outsourcedApi) {
            console.error('Cannot get project: API is not available.')
            return
        }

        const result = this.repo.query()
            .property(data)

        const project = result.get()
        result.close()
        if (!project) {
            this.repo.insert({
                uuid: data,
                loading: true
            })
        }

        outsourcedApi.projects().get(data)
            .then((response: any) => {
                if (!response.ok) {
                    this.repo.insert({
                        uuid: data,
                        loading: false,
                        error: {
                            status: response.status,
                            message: response.body.message
                        }
                    })
                } else {
                    this.repo.insert(response.body)
                }
            })
    }
}
