import { Controller } from '@/lib/framework'
import { ProjectApi, ProjectEntity } from '@/lib/log-outsourced-api'
import { AlertHelper } from '@/module/alert'
import { Channel } from '@wildebeest/observable'
import { Repository } from '@wildebeest/repository'

export class ProjectGenerateUrlController implements Controller {
    private projectApi: ProjectApi
    private channel: Channel<any>
    private projects: Repository<ProjectEntity>

    public constructor (projects: Repository<ProjectEntity>, projectApi: ProjectApi, channel: Channel<any>) {
        this.projectApi = projectApi
        this.channel = channel
        this.projects = projects
    }

    public action (data: any): void {
        this.projectApi.generate(data.body.identify())
            .then((project: ProjectEntity) => {
                this.projects.insert(project)
                this.channel.dispatch(
                    AlertHelper.infoEvent('Url has been regenerated')
                )
                if (data.success) {
                    data.success(project)
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
