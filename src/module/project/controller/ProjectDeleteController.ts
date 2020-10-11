import { Controller } from '@/lib/framework'
import { OutsourcedApi } from '@/lib/log-outsourced-api'
import { AlertHelper } from '@/module/alert'
import { Channel, StatefulChannel } from '@wildebeest/observable'
import { Repository } from '@wildebeest/repository'

export class ProjectDeleteController implements Controller {
    private api: StatefulChannel<OutsourcedApi>
    private channel: Channel<any>
    private projects: Repository<any>

    public constructor (projects: Repository<any>, api: StatefulChannel<OutsourcedApi>, channel: Channel<any>) {
        this.api = api
        this.channel = channel
        this.projects = projects
    }

    public action (data?: any): void {
        const outsourcedApi = this.api.get()
        if (!outsourcedApi) {
            console.error('Cannot load projects: API is not available.')
            return
        }

        outsourcedApi.projects().delete(data.body)
            .then(() => {
                this.projects.remove(data.body)
                this.channel.dispatch(
                    AlertHelper.infoEvent('Project has been deleted')
                )
                if (data.success) {
                    data.success()
                }
            })
            .catch((error: any) => {
                console.error(error)
                this.channel.dispatch(
                    AlertHelper.errorEvent('Cannot delete project')
                )
            })
    }
}
