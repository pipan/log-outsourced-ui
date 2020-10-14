import { Module, Store, ControllerProvider, Management } from '@/lib/framework'
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
            .withCreateAction(() => this.api.projects(), alertable)
            .withUpdateAction(() => this.api.projects(), alertable)
            .build()
    }

    public getStore (): Store {
        return this.cudModule.getStore()
    }

    public getControllerProvider (store: Store): ControllerProvider {
        const repo = store.get('projects')
        return (new Management())
            .withProvider(this.cudModule.getControllerProvider(store))
            .withAction(
                'project@load',
                new ProjectLoadAllController(repo, this.api)
            )
            // .withAction(
            //     'project@open',
            //     new ProjectOpenController()
            // )
    }
}
