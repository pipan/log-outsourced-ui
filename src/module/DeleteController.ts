import { Controller } from '@/lib/framework'
import { Repository } from '@wildebeest/repository'
import { DeleteHttp } from '@/lib/log-outsourced-api/http'
import { Alertable } from './alert'

export class DeleteController implements Controller {
    private repo: Repository<any>
    private alertable: Alertable
    private httpFactory: () => DeleteHttp

    public constructor (repo: Repository<any>, httpFactory: () => DeleteHttp, alertable: Alertable) {
        this.repo = repo
        this.alertable = alertable
        this.httpFactory = httpFactory
    }

    public action (data?: any): void {
        this.httpFactory().delete(data.body)
            .then((response: any) => {
                if (response.ok) {
                    this.repo.remove(data.body)
                    this.alertable.success('Removed')
                    if (data.success) {
                        data.success()
                    }
                }
            })
    }
}
