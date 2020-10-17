import { Controller } from '@/lib/framework'
import { OutsourcedApi } from '@/lib/log-outsourced-api'
import { Repository } from '@wildebeest/repository'

export class AdministratorInviteController implements Controller {
    private admins: Repository<any>
    private api: OutsourcedApi

    public constructor (admins: Repository<any>, api: OutsourcedApi) {
        this.api = api
        this.admins = admins
    }

    public action (data?: any): void {
        this.api.administrators().invite(data.body)
            .then((response: any) => {
                if (!response.ok) {
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
