import { Controller } from '@/lib/framework'
import { Repository } from '@wildebeest/repository'
import { UpdateHttp } from '@/lib/log-outsourced-api/http'
import { Alertable } from './alert'
import { FormValidator } from './form'

export class UpdateController implements Controller {
    private repo: Repository<any>
    private alertable: Alertable
    private httpFactory: () => UpdateHttp
    private FormValidator: FormValidator

    public constructor (repo: Repository<any>, httpFactory: () => UpdateHttp, alertable: Alertable, FormValidator: FormValidator) {
        this.repo = repo
        this.alertable = alertable
        this.httpFactory = httpFactory
        this.FormValidator = FormValidator
    }

    public action (data?: any): void {
        this.httpFactory().update(data.body)
            .then((response: any) => {
                if (!response.ok) {
                    this.FormValidator.validateHttpResponse(data.uid, response)
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
