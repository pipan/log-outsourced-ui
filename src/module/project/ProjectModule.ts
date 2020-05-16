import { Module } from '@/lib/framework'
import { ProjectCreateOpenController } from './controller/ProjectCreateOpenController'
import { Context } from '@/lib/framework/module/Context'
import { MapEntry, ObservableProperty, ObservableList, SimpleObservableList, SimpleObservableProperty } from '@wildebeest/observe-changes'
import { ProjectCreateCloseController } from './controller/ProjectCreateCloseController'
import { ProjectOpenController } from './controller/ProjectOpenController'
import { ProjectApi, ProjectEntity } from '@/lib/log-outsourced-api'
import { ProjectHttpApi } from '@/lib/log-outsourced-api/domain/project/ProjectHttpApi'
import { Channel } from '@/lib/broadcast/Channel'
import { ProjectCreateController } from './controller/ProjectCreateController'
import { ProjectLoadAllController } from './controller/ProjectLoadAllController'
import { ProjectDeleteController } from './controller/ProjectDeleteController'
import { ProjectCreateResetController } from './controller/ProjectCreateResetController'

export class ProjectModule implements Module {
    private projectApi: ProjectApi

    public constructor (projectApi: ProjectApi) {
        this.projectApi = projectApi
    }

    public install (context: Context): void {
        const scene: ObservableProperty<string> = context.observables().get('scene')
        const channel: Channel = context.observables().get('channel')
        const projects: ObservableList<ProjectEntity> = new SimpleObservableList()
        const projectCreate: ObservableProperty<any> = new SimpleObservableProperty()

        context.observables().add('projects', projects)
        context.observables().add('projectCreate', projectCreate)

        context.controllers().addList([
            new MapEntry('project.create@open', new ProjectCreateOpenController(scene)),
            new MapEntry('project.create@close', new ProjectCreateCloseController(scene)),
            new MapEntry('project.create@reset', new ProjectCreateResetController(projectCreate)),
            new MapEntry('project@open', new ProjectOpenController()),
            new MapEntry('project@create', new ProjectCreateController(projects, channel, this.projectApi)),
            new MapEntry('project@load.all', new ProjectLoadAllController(projects, this.projectApi, channel)),
            new MapEntry('project@delete', new ProjectDeleteController(this.projectApi, channel, projects))
        ])

        channel.dispatch({ event: 'project.create@reset' })
        channel.dispatch({ event: 'project@load.all' })
    }
}
