import { Controller } from '@/lib/framework'
import { ObservableList } from '@wildebeest/observe-changes'
import { ProjectEntity, ProjectApi } from '@/lib/log-outsourced-api'
import { Channel } from '@/lib/broadcast/Channel'

export class ProjectLoadAllController implements Controller {
    private projects: ObservableList<ProjectEntity>
    private projectApi: ProjectApi
    private channel: Channel

    public constructor (projects: ObservableList<ProjectEntity>, projectApi: ProjectApi, channel: Channel) {
        this.projectApi = projectApi
        this.projects = projects
        this.channel = channel
    }

    public action (data?: any): void {
        this.projectApi.all()
            .then((projects: Array<ProjectEntity>) => {
                this.projects.setAll(projects)
            })
            .catch((error: any) => {
                console.error(error)
                this.channel.dispatch({
                    event: 'alert@create',
                    data: {
                        message: 'Cannot load projects',
                        type: 'error'
                    }
                })
            })
    }
}
