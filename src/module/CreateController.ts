import { Controller } from '@/lib/framework'
import { Repository } from '@wildebeest/repository'
import { CreateHttp } from '@/lib/log-outsourced-api/http'
import { Alertable } from './alert'
import { ServerValidator } from './form'

export class CreateController implements Controller {
    private repo: Repository<any>
    private serverValidator: ServerValidator
    private alertable: Alertable
    private httpFactory: () => CreateHttp

    public constructor (repo: Repository<any>, httpFactory: () => CreateHttp, alertable: Alertable, serverValidator: ServerValidator) {
        this.repo = repo
        this.alertable = alertable
        this.httpFactory = httpFactory
        this.serverValidator = serverValidator
    }

    public action (data?: any): void {
        this.httpFactory().create(data.body)
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
