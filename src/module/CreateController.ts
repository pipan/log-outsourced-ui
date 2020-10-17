import { Controller } from '@/lib/framework'
import { Repository } from '@wildebeest/repository'
import { CreateHttp } from '@/lib/log-outsourced-api/http'
import { Alertable } from './alert'

export class CreateController implements Controller {
    private repo: Repository<any>
    private alertable: Alertable
    private httpFactory: () => CreateHttp

    public constructor (repo: Repository<any>, httpFactory: () => CreateHttp, alertable: Alertable) {
        this.repo = repo
        this.alertable = alertable
        this.httpFactory = httpFactory
    }

    public action (data?: any): void {
        this.httpFactory().create(data.body)
            .then((response: any) => {
                if (!response.ok) {
                    return response
                }
                this.repo.insert(response.body)
                this.alertable.success('')
                if (data.success) {
                    data.success(response.body)
                }
            })
            .catch((error: any) => {
                console.error(error)
                this.alertable.error(error)
            })
    }
}
