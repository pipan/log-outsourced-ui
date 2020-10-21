import { Controller } from '@/lib/framework'
import { Repository } from '@wildebeest/repository'
import { UpdateHttp } from '@/lib/log-outsourced-api/http'
import { Alertable } from './alert'
import { ServerValidator } from './form'

export class UpdateController implements Controller {
    private repo: Repository<any>
    private alertable: Alertable
    private httpFactory: () => UpdateHttp
    private serverValidator: ServerValidator

    public constructor (repo: Repository<any>, httpFactory: () => UpdateHttp, alertable: Alertable, serverValidator: ServerValidator) {
        this.repo = repo
        this.alertable = alertable
        this.httpFactory = httpFactory
        this.serverValidator = serverValidator
    }

    public action (data?: any): void {
        this.httpFactory().update(data.body)
            .then((response: any) => {
                if (!response.ok) {
                    this.serverValidator.validate(data.uid, response)
                    return response
                }

                this.repo.insert(response.body)
                this.alertable.success('')
                if (data.success) {
                    data.success(response.body)
                }
            })
    }
}
