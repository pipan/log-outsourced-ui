import { Module, BootContext, RegisterContext, Store } from '@/lib/framework'
import { ModuleBuilder } from '../ModuleBuilder'
import { OutsourcedApi } from '@/lib/log-outsourced-api'
import { Alertable } from '../alert'
import { FormValidator } from '../form'
import { SimpleRepository } from '@wildebeest/repository'

export class ProjectKeyModule implements Module {
    private cludModule: Module

    constructor (api: OutsourcedApi, alertable: Alertable, FormValidator: FormValidator) {
        this.cludModule = (new ModuleBuilder('projectKey'))
            .withRepository(SimpleRepository.fromKeyProperty('key'))
            .withCreateAction(() => api.projectKeys(), alertable, FormValidator)
            .withUpdateAction(() => api.projectKeys(), alertable, FormValidator)
            .withDeleteAction(() => api.projectKeys(), alertable)
            .withLoadForProjectAction(() => api.projectKeys())
            .withClearOnProjectOpen()
            .build()
    }

    public boot (context: BootContext): void {
        this.cludModule.boot(context)
    }

    public register (context: RegisterContext, store: Store): void {
        this.cludModule.register(context, store)
    }
}
