import { Controller } from '@/lib/framework'
import { ProjectEntity, ProjectApi } from '@/lib/log-outsourced-api'
import { Repository } from '@wildebeest/repository'
import { Channel } from '@wildebeest/observable'
import { AlertHelper } from '@/module/alert'

export class ProjectLoadAllController implements Controller {
    private projects: Repository<ProjectEntity>
    private projectApi: ProjectApi
    private channel: Channel<any>

    public constructor (projects: Repository<ProjectEntity>, projectApi: ProjectApi, channel: Channel<any>) {
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
                this.channel.dispatch(
                    AlertHelper.errorEvent(error)
                )
            })
    }
}
