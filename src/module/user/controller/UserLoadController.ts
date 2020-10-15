import { Controller } from '@/lib/framework'
import { OutsourcedApi } from '@/lib/log-outsourced-api'
import { Repository } from '@wildebeest/repository'

export class UserLoadController implements Controller {
    private repo: Repository<any>
    private api: OutsourcedApi

    public constructor (repo: Repository<any>, api: OutsourcedApi) {
        this.api = api
        this.repo = repo
    }

    public action (data?: any): void {
        this.api.users().all(data)
            .then((response: any) => {
                if (response.ok) {
                    this.repo.setAll(response.body.items)
                }
            })
            .catch(() => {
                this.repo.clear()
            })
    }
}
