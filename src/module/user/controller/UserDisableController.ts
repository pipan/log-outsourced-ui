import { Controller } from '@/lib/framework'
import { Repository } from '@wildebeest/repository'
import { UpdateHttp } from '@/lib/log-outsourced-api/http'
import { Alertable } from '../../alert'

export class UserDisableController implements Controller {
    private repo: Repository<any>
    private alertable: Alertable
    private httpFactory: () => UpdateHttp

    public constructor (repo: Repository<any>, httpFactory: () => UpdateHttp, alertable: Alertable) {
        this.repo = repo
        this.alertable = alertable
        this.httpFactory = httpFactory
    }

    public action (data?: any): void {
        this.httpFactory().update({
                uuid: data.body.uuid,
                roles: []
            }).then((response: any) => {
                if (response.ok) {
                    this.repo.insert(response.body)
                    this.alertable.success('Disabled')
                    if (data.success) {
                        data.success(response.body)
                    }
                }
            })
    }
}
