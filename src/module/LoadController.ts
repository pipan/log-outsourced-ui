import { Controller } from '@/lib/framework'
import { Repository } from '@wildebeest/repository'
import { LoadHttp } from '@/lib/log-outsourced-api/http/LoadHttp'

export class LoadController implements Controller {
    private httpFactory: () => LoadHttp
    private repo: Repository<any>

    public constructor (repo: Repository<any>, httpFactory: () => LoadHttp) {
        this.repo = repo
        this.httpFactory = httpFactory
    }

    public action (data?: any): void {
        this.httpFactory().all()
            .then((response: any) => {
                if (response.ok) {
                    this.repo.setAll(response.body.items)
                }
            })
    }
}
