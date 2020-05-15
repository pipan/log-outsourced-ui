import { Module } from '@/lib/framework'
import { ProjectCreateOpenController } from './controller/ProjectCreateOpenController'
import { Context } from '@/lib/framework/module/Context'
import { MapEntry, ObservableProperty } from '@wildebeest/observe-changes'
import { ProjectCreateCloseController } from './controller/ProjectCreateCloseController'
import { ProjectOpenController } from './controller/ProjectOpenController'

export class ProjectModule implements Module {
    public install (context: Context): void {
        const scene: ObservableProperty<string> = context.observables().get('scene')

        context.controllers().addList([
            new MapEntry('project.create@open', new ProjectCreateOpenController(scene)),
            new MapEntry('project.create@close', new ProjectCreateCloseController(scene)),
            new MapEntry('project@open', new ProjectOpenController())
        ])
    }
}
