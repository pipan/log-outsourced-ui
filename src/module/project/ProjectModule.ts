import { Module } from '@/lib/framework'
import { ProjectCreateOpenController } from './controller/ProjectCreateOpenController'
import { Context } from '@/lib/framework/module/Context'
import { MapEntry, ObservableProperty, ObservableList, SimpleObservableList, SimpleObservableProperty } from '@wildebeest/observe-changes'
import { ProjectCreateCloseController } from './controller/ProjectCreateCloseController'
import { ProjectOpenController } from './controller/ProjectOpenController'
import { ProjectApi, ProjectEntity } from '@/lib/log-outsourced-api'
import { Channel } from '@/lib/broadcast/Channel'
import { ProjectCreateController } from './controller/ProjectCreateController'
import { ProjectLoadAllController } from './controller/ProjectLoadAllController'
import { ProjectDeleteController } from './controller/ProjectDeleteController'
import { ProjectCreateResetController } from './controller/ProjectCreateResetController'
import { ValidatorBuilder } from '@/lib/validator'
import { ActiveProjectFreshService } from './service/ActiveProjectFreshService'

export class ProjectModule implements Module {
    private projectApi: ProjectApi
    private validatorBuilder: ValidatorBuilder

    public constructor (projectApi: ProjectApi, validatorBuilder: ValidatorBuilder) {
        this.projectApi = projectApi
        this.validatorBuilder = validatorBuilder
    }

    public install (context: Context): void {
        const scene: ObservableProperty<string> = context.observables().get('scene')
        const channel: Channel = context.channel()
        const projects: ObservableList<ProjectEntity> = new SimpleObservableList()
        const projectCreate: ObservableProperty<any> = new SimpleObservableProperty()
        const projectActive: ObservableProperty<ProjectEntity> = new SimpleObservableProperty()

        context.observables().add('projects', projects)
        context.observables().add('project.create', projectCreate)
        context.observables().add('project.active', projectActive)

        context.controllers().addList([
            new MapEntry('project.create@open', new ProjectCreateOpenController(scene)),
            new MapEntry('project.create@close', new ProjectCreateCloseController(scene)),
            new MapEntry('project.create@reset', new ProjectCreateResetController(projectCreate)),
            new MapEntry('project@open', new ProjectOpenController(projectActive, channel)),
            new MapEntry('project@create', new ProjectCreateController(this.validatorBuilder, projects, channel, this.projectApi, projectCreate)),
            new MapEntry('project@load.all', new ProjectLoadAllController(projects, this.projectApi, channel)),
            new MapEntry('project@delete', new ProjectDeleteController(this.projectApi, channel, projects))
        ])

        const activeProjectFreshService: ActiveProjectFreshService = new ActiveProjectFreshService(projects, projectActive, context.channel())
        activeProjectFreshService.start()

        channel.dispatch({ event: 'project.create@reset' })
    }
}
