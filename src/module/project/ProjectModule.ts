import { Module } from '@/lib/framework'
import { Context } from '@/lib/framework/module/Context'
import { OutsourcedApi } from '@/lib/log-outsourced-api'
import { ProjectLoadAllController } from './controller/ProjectLoadAllController'
import { Channel, StatefulChannel } from '@wildebeest/observable'
import { Repository, SimpleRepository } from '@wildebeest/repository'
import { ProjectCreateController } from './controller/ProjectCreateController'
import { ProjectDeleteController } from './controller/ProjectDeleteController'
import { ProjectUpdateController } from './controller/ProjectUpdateController'

export class ProjectModule implements Module {
    private api: StatefulChannel<OutsourcedApi>

    public constructor (api: StatefulChannel<OutsourcedApi>) {
        this.api = api
    }

    public install (context: Context): void {
        const channel: Channel<any> = context.channel()
        const projects: Repository<any> = SimpleRepository.fromKeyProperty('uuid')

        context.repositories().insert('projects', projects)

        context.controllers().insert('project@load', new ProjectLoadAllController(projects, this.api, channel))
        context.controllers().insert('project@delete', new ProjectDeleteController(projects, this.api, channel))
        context.controllers().insert('project@create', new ProjectCreateController(projects, this.api, channel))
        context.controllers().insert('project@update', new ProjectUpdateController(projects, this.api, channel))

        // context.controllers().insert('project@open', new ProjectOpenController(projects, properties, this.projectApi, channel))
        // context.controllers().insert('project@close', new ProjectCloseController(properties, channel))
        // context.controllers().insert('project@generate', new ProjectGenerateUrlController(projects, this.projectApi, channel))

        channel.dispatch({ event: 'project.create@reset' })
    }
}
