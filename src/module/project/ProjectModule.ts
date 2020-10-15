import { Module, Store, BootContext, RegisterContext } from '@/lib/framework'
import { OutsourcedApi } from '@/lib/log-outsourced-api'
import { ProjectLoadAllController } from './controller/ProjectLoadAllController'
import { ModuleBuilder } from '../ModuleBuilder'
import { Alertable } from '../alert'

export class ProjectModule implements Module {
    private api: OutsourcedApi
    private alertable: Alertable
    private cudModule: Module

    public constructor (api: OutsourcedApi, alertable: Alertable) {
        this.api = api
        this.alertable = alertable

        this.cudModule = (new ModuleBuilder('project'))
            .withCreateAction(() => this.api.projects(), alertable)
            .withDeleteAction(() => this.api.projects(), alertable)
            .withUpdateAction(() => this.api.projects(), alertable)
            .build()
    }

    public boot (context: BootContext): void {
        this.cudModule.boot(context)
    }

    public register (context: RegisterContext, store: Store): void {
        this.cudModule.register(context, store)

        const repo = store.get('projects')
        context.withController(
                'project@load',
                new ProjectLoadAllController(repo, this.api)
            )
            // .withAction(
            //     'project@open',
            //     new ProjectOpenController()
            // )
    }
}
