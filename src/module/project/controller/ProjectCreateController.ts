import { Controller } from '@/lib/framework'
import { OutsourcedApi } from '@/lib/log-outsourced-api'
import { AlertHelper } from '@/module/alert'
import { Repository } from '@wildebeest/repository'
import { Channel, StatefulChannel } from '@wildebeest/observable'

export class ProjectCreateController implements Controller {
    private projects: Repository<any>
    private channel: Channel<any>
    private api: StatefulChannel<OutsourcedApi>

    public constructor (
        projects: Repository<any>,
        api: StatefulChannel<OutsourcedApi>,
        channel: Channel<any>
    ) {
        this.projects = projects
        this.channel = channel
        this.api = api
    }

    public action (data?: any): void {
        const outsourcedApi = this.api.get()
        if (!outsourcedApi) {
            console.error('Cannot create projects: API is not available.')
            return
        }

        outsourcedApi.projects().create(data.body)
            .then((response: any) => {
                this.projects.insert(response.body)
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
