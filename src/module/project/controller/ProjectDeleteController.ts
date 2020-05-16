import { Controller } from '@/lib/framework'
import { ProjectApi, ProjectEntity } from '@/lib/log-outsourced-api'
import { Channel } from '@/lib/broadcast/Channel'
import { ObservableList } from '@wildebeest/observe-changes'

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
                this.channel.dispatch({
                    event: 'alert@create',
                    data: {
                        message: 'Project has been deleted',
                        type: 'success'
                    }
                })
                this.projects.remove(data)
            })
            .catch((error: any) => {
                console.error(error)
                this.channel.dispatch({
                    event: 'alert@create',
                    data: {
                        message: 'Cannot delete project',
                        type: 'error'
                    }
                })
            })
    }
}
