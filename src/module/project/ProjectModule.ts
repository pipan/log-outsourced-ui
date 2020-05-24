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
import { ProjectCloseController } from './controller/ProjectCloseController'
import { ProjectLoadController } from './controller/ProjectLoadController'
import { ProjectRefreshController } from './controller/ProjectRefreshController'

export class ProjectModule implements Module {
    private projectApi: ProjectApi
    private validatorBuilder: ValidatorBuilder

    public constructor (projectApi: ProjectApi, validatorBuilder: ValidatorBuilder) {
        this.projectApi = projectApi
        this.validatorBuilder = validatorBuilder
    }

    public install (context: Context): void {
        const channel: Channel = context.channel()
        const projects: ObservableList<ProjectEntity> = new SimpleObservableList()
        const projectCreate: ObservableProperty<any> = new SimpleObservableProperty()
        const projectActive: ObservableProperty<ProjectEntity> = new SimpleObservableProperty()
        const projectActiveUuid: ObservableProperty<string> = new SimpleObservableProperty()

        context.observables().add('projects', projects)
        context.observables().add('project.create', projectCreate)
        context.observables().add('project.active', projectActive)
        context.observables().add('project.active.uuid', projectActiveUuid)

        context.controllers().addList([
            new MapEntry('project.create@open', new ProjectCreateOpenController(channel)),
            new MapEntry('project.create@close', new ProjectCreateCloseController(channel)),
            new MapEntry('project.create@reset', new ProjectCreateResetController(projectCreate)),
            new MapEntry('project@open', new ProjectOpenController(projectActive, channel, this.projectApi)),
            new MapEntry('project@close', new ProjectCloseController(channel, projectActive)),
            new MapEntry('project@all', new ProjectCloseController(channel, projectActive)),
            new MapEntry('project@create', new ProjectCreateController(this.validatorBuilder, projects, channel, this.projectApi, projectCreate)),
            new MapEntry('project@load.all', new ProjectLoadAllController(projects, this.projectApi, channel)),
            new MapEntry('project@delete', new ProjectDeleteController(this.projectApi, channel, projects)),
            new MapEntry('project@load', new ProjectLoadController(projectActive, channel, this.projectApi)),
            new MapEntry('project@refresh', new ProjectRefreshController(projectActive, channel))
        ])

        channel.dispatch({ event: 'project.create@reset' })
    }
}
