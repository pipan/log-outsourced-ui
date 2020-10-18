import { Controller } from '@/lib/framework'
import { Repository } from '@wildebeest/repository'
import { UpdateHttp } from '@/lib/log-outsourced-api/http'
import { Alertable } from './alert'

export class UpdateController implements Controller {
    private repo: Repository<any>
    private alertable: Alertable
    private httpFactory: () => UpdateHttp

    public constructor (repo: Repository<any>, httpFactory: () => UpdateHttp, alertable: Alertable) {
        this.repo = repo
        this.alertable = alertable
        this.httpFactory = httpFactory
    }

    public action (data?: any): void {
        this.httpFactory().update(data.body)
            .then((response: any) => {
                this.repo.insert(response.body)
                this.alertable.success('')
                if (data.success) {
                    data.success(response.body)
                }
            })
    }
}
