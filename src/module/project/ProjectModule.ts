import { Module } from '@/lib/framework'
import { Context } from '@/lib/framework/module/Context'
import { OutsourcedApi } from '@/lib/log-outsourced-api'
import { ProjectLoadAllController } from './controller/ProjectLoadAllController'
import { ValidatorBuilder } from '@/lib/validator'
import { Channel, StatefulChannel } from '@wildebeest/observable'
import { Repository, SimpleRepository } from '@wildebeest/repository'

export class ProjectModule implements Module {
    private api: StatefulChannel<OutsourcedApi>
    private validatorBuilder: ValidatorBuilder

    public constructor (api: StatefulChannel<OutsourcedApi>, validatorBuilder: ValidatorBuilder) {
        this.api = api
        this.validatorBuilder = validatorBuilder
    }

    public install (context: Context): void {
        const channel: Channel<any> = context.channel()
        const projects: Repository<any> = SimpleRepository.fromKeyProperty('uuid')

        context.repositories().insert('projects', projects)

        // context.controllers().insert('project.create@reset', new ProjectCreateResetController(properties))
        context.controllers().insert('project@load', new ProjectLoadAllController(projects, this.api, channel))
        // context.controllers().insert('project@delete', new ProjectDeleteController(projects, this.projectApi, channel))
        // context.controllers().insert('project@create', new ProjectCreateController(projects, properties, this.projectApi, channel, this.validatorBuilder))

        // context.controllers().insert('project@open', new ProjectOpenController(projects, properties, this.projectApi, channel))
        // context.controllers().insert('project@close', new ProjectCloseController(properties, channel))
        // context.controllers().insert('project@generate', new ProjectGenerateUrlController(projects, this.projectApi, channel))

        // const activeProjectService = new ActiveProjectService(projects, properties)
        // activeProjectService.start()

        channel.dispatch({ event: 'project.create@reset' })
    }
}
