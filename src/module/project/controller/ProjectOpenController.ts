import { Controller } from '@/lib/framework'
import { ObservableProperty } from '@wildebeest/observe-changes'
import { ProjectEntity, ProjectApi } from '@/lib/log-outsourced-api'
import { Channel } from '@/lib/broadcast/Channel'
import { AlertHelper } from '@/module/alert'

export class ProjectOpenController implements Controller {
    private active: ObservableProperty<ProjectEntity>
    private channel: Channel
    private projectApi: ProjectApi

    public constructor (active: ObservableProperty<ProjectEntity>, channel: Channel, projectApi: ProjectApi) {
        this.active = active
        this.channel = channel
        this.projectApi = projectApi
    }

    public action (data?: any): void {
        this.projectApi.view(data.getUuid())
            .then((project: ProjectEntity) => {
                this.active.set(project)
                this.channel.dispatch({
                    event: 'scene@change',
                    data: '/project/' + project.getUuid()
                })
            })
            .catch((error: any) => {
                console.error(error)
                this.channel.dispatch(
                    AlertHelper.errorEvent('Cannot load project data')
                )
            })
    }
}
