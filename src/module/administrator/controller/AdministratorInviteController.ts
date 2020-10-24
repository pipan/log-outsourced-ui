import { Controller } from '@/lib/framework'
import { OutsourcedApi } from '@/lib/log-outsourced-api'
import { Repository } from '@wildebeest/repository'
import { FormValidator } from '@/module/form'

export class AdministratorInviteController implements Controller {
    private admins: Repository<any>
    private api: OutsourcedApi
    private formValidator: FormValidator

    public constructor (admins: Repository<any>, api: OutsourcedApi, formValidator: FormValidator) {
        this.api = api
        this.admins = admins
        this.formValidator = formValidator
    }

    public action (data?: any): void {
        this.api.administrators().invite(data.body)
            .then((response: any) => {
                if (!response.ok) {
                    this.formValidator.validateHttpResponse(data.uid, response)
                    return response
                }
                this.admins.insert(response.body)
                if (data.success) {
                    data.success(response.body)
                }
            })
            .catch(() => {
                this.admins.clear()
            })
    }
}
