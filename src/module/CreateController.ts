import { Controller } from '@/lib/framework'
import { AlertHelper } from '@/module/alert'
import { Repository } from '@wildebeest/repository'
import { Channel } from '@wildebeest/observable'
import { CreateHttp } from '@/lib/log-outsourced-api/http'

export class CreateController implements Controller {
    private repo: Repository<any>
    private channel: Channel<any>
    private createHttp: CreateHttp

    public constructor (
        repo: Repository<any>,
        http: CreateHttp,
        channel: Channel<any>
    ) {
        this.repo = repo
        this.channel = channel
        this.createHttp = http
    }

    public action (data?: any): void {
        this.createHttp.create(data.body)
            .then((response: any) => {
                this.repo.insert(response.body)
                this.channel.dispatch(
                    AlertHelper.infoEvent('Project has been created')
                )
                if (data.success) {
                    data.success(response.body)
                }
            })
            .catch((error: any) => {
                console.error(error)
                this.channel.dispatch(
                    AlertHelper.errorEvent(error)
                )
            })
    }
}
