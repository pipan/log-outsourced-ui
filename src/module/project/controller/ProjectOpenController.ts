import { Controller, PropertyEntity } from '@/lib/framework'
import { ProjectEntity, ProjectApi } from '@/lib/log-outsourced-api'
import { AlertHelper } from '@/module/alert'
import { Channel } from '@wildebeest/observable'
import { Repository } from '@wildebeest/repository'

export class ProjectOpenController implements Controller {
    private projects: Repository<ProjectEntity>
    private properties: Repository<PropertyEntity>
    private channel: Channel<any>
    private projectApi: ProjectApi

    public constructor (projects: Repository<ProjectEntity>, properties: Repository<PropertyEntity>, projectApi: ProjectApi, channel: Channel<any>) {
        this.projects = projects
        this.properties = properties
        this.channel = channel
        this.projectApi = projectApi
    }

    public action (uuid: string): void {
        this.projectApi.view(uuid)
            .then((result: any) => {
                this.projects.insert(result.project)
                this.channel.dispatch({
                    event: 'listener@set.all',
                    data: result.listeners
                })
                this.properties.insert(
                    new PropertyEntity('project.active.uuid', uuid)
                )
            })
            .catch((error: any) => {
                console.error(error)
                this.channel.dispatch(
                    AlertHelper.errorEvent(error)
                )
            })
    }
}
