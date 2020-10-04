import { Module, PropertyEntity } from '@/lib/framework'
import { Context } from '@/lib/framework/module/Context'
import { ProjectOpenController } from './controller/ProjectOpenController'
import { ProjectApi, ProjectEntity } from '@/lib/log-outsourced-api'
import { ProjectCreateController } from './controller/ProjectCreateController'
import { ProjectLoadAllController } from './controller/ProjectLoadAllController'
import { ProjectDeleteController } from './controller/ProjectDeleteController'
import { ProjectCreateResetController } from './controller/ProjectCreateResetController'
import { ValidatorBuilder } from '@/lib/validator'
import { ProjectCloseController } from './controller/ProjectCloseController'
import { Channel } from '@wildebeest/observable'
import { Repository, SimpleRepository } from '@wildebeest/repository'
import { ActiveProjectService } from './service/ActiveProjectService'
import { ProjectGenerateUrlController } from './controller/ProjectGenerateUrlConroller'

export class ProjectModule implements Module {
    private projectApi: ProjectApi
    private validatorBuilder: ValidatorBuilder

    public constructor (projectApi: ProjectApi, validatorBuilder: ValidatorBuilder) {
        this.projectApi = projectApi
        this.validatorBuilder = validatorBuilder
    }

    public install (context: Context): void {
        const channel: Channel<any> = context.channel()
        const projects: Repository<ProjectEntity> = SimpleRepository.createIdentifiable()

        context.repositories().insert('projects', projects)

        const properties: Repository<PropertyEntity> = context.repositories().get('properties')!
        properties.insert(new PropertyEntity('project.create', undefined))
        properties.insert(new PropertyEntity('project.active', undefined))
        properties.insert(new PropertyEntity('project.active.uuid', ''))

        context.controllers().insert('project.create@reset', new ProjectCreateResetController(properties))
        context.controllers().insert('project@load.all', new ProjectLoadAllController(projects, this.projectApi, channel))
        context.controllers().insert('project@delete', new ProjectDeleteController(projects, this.projectApi, channel))
        context.controllers().insert('project@create', new ProjectCreateController(projects, properties, this.projectApi, channel, this.validatorBuilder))

        context.controllers().insert('project@open', new ProjectOpenController(projects, properties, this.projectApi, channel))
        context.controllers().insert('project@close', new ProjectCloseController(properties, channel))
        context.controllers().insert('project@generate', new ProjectGenerateUrlController(projects, this.projectApi, channel))

        const activeProjectService = new ActiveProjectService(projects, properties)
        activeProjectService.start()

        channel.dispatch({ event: 'project.create@reset' })
    }
}
