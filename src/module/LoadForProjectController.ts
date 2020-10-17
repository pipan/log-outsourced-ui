import { Controller } from '@/lib/framework'
import { Repository } from '@wildebeest/repository'
import { AllForProjectHttp } from '@/lib/log-outsourced-api/http'

export class LoadForProjectController implements Controller {
    private repo: Repository<any>
    private http: AllForProjectHttp

    public constructor (repo: Repository<any>, http: AllForProjectHttp) {
        this.http = http
        this.repo = repo
    }

    public action (data?: any): void {
        this.http.all(data)
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
