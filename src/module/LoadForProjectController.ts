import { Controller } from '@/lib/framework'
import { Repository } from '@wildebeest/repository'
import { AllForProjectHttp } from '@/lib/log-outsourced-api/http'

export class LoadForProjectController implements Controller {
    private repo: Repository<any>
    private httpFactory: () => AllForProjectHttp

    public constructor (repo: Repository<any>, httpFactory: () => AllForProjectHttp) {
        this.httpFactory = httpFactory
        this.repo = repo
    }

    public action (data?: any): void {
        this.httpFactory().all(data)
            .then((response: any) => {
                if (response.ok) {
                    this.repo.setAll(response.body.items)
                }
            })
            .catch(() => {
                this.repo.clear()
            })
    }
}
