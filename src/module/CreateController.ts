import { Controller } from '@/lib/framework'
import { Repository } from '@wildebeest/repository'
import { CreateHttp } from '@/lib/log-outsourced-api/http'
import { Alertable } from './alert'
import { FormValidator } from './form'

export class CreateController implements Controller {
    private repo: Repository<any>
    private FormValidator: FormValidator
    private alertable: Alertable
    private httpFactory: () => CreateHttp

    public constructor (repo: Repository<any>, httpFactory: () => CreateHttp, alertable: Alertable, FormValidator: FormValidator) {
        this.repo = repo
        this.alertable = alertable
        this.httpFactory = httpFactory
        this.FormValidator = FormValidator
    }

    public action (data?: any): void {
        this.httpFactory().create(data.body)
        .then((response: any) => {
                if (!response.ok) {
                    this.FormValidator.validateHttpResponse(data.uid, response)
                    return response
                }
                this.repo.insert(response.body)
                this.alertable.success('Saved')
                if (data.success) {
                    data.success(response.body)
                }
            })
    }
}
