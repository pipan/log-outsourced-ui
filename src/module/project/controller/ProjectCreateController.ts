import { Controller } from '@/lib/framework'
import { ObservableList, ObservableProperty } from '@wildebeest/observe-changes'
import { ProjectEntity, ProjectApi } from '@/lib/log-outsourced-api'
import { Channel } from '@/lib/broadcast/Channel'

export class ProjectCreateController implements Controller {
    private projects: ObservableList<ProjectEntity>
    private channel: Channel
    private projectApi: ProjectApi

    public constructor (projects: ObservableList<ProjectEntity>, channel: Channel, projectApi: ProjectApi) {
        this.projects = projects
        this.channel = channel
        this.projectApi = projectApi
    }

    public action (data?: any): void {
        this.projectApi.create(new ProjectEntity('', data.name))
            .then((project: ProjectEntity) => {
                this.projects.add(project)
                this.channel.dispatch({
                    event: 'alert@create',
                    data: {
                        message: 'Project has been created',
                        type: 'success'
                    }
                })
                this.channel.dispatch({ event: 'project.create@reset' })
                this.channel.dispatch({
                    event: 'scene@change',
                    data: '/'
                })
            })
            .catch((error: any) => {
                console.error(error)
                this.channel.dispatch({
                    event: 'alert@create',
                    data: {
                        message: 'Cannot save project',
                        type: 'error'
                    }
                })
            })
    }
}
