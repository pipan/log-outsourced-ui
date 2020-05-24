import { Controller } from '@/lib/framework'
import { ProjectApi, ProjectEntity } from '@/lib/log-outsourced-api'
import { Channel } from '@/lib/broadcast/Channel'
import { ObservableList } from '@wildebeest/observe-changes'
import { AlertHelper } from '@/module/alert'

export class ProjectDeleteController implements Controller {
    private projectApi: ProjectApi
    private channel: Channel
    private projects: ObservableList<ProjectEntity>

    public constructor (projectApi: ProjectApi, channel: Channel, projects: ObservableList<ProjectEntity>) {
        this.projectApi = projectApi
        this.channel = channel
        this.projects = projects
    }

    public action (data?: any): void {
        this.projectApi.delete(data)
            .then(() => {
                this.projects.remove(data)
                this.channel.dispatch(
                    AlertHelper.infoEvent('Project has been deleted')
                )
            })
            .catch((error: any) => {
                console.error(error)
                this.channel.dispatch(
                    AlertHelper.errorEvent('Cannot delete project')
                )
            })
    }
}
