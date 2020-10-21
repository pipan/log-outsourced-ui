import { Module, BootContext, RegisterContext, Store } from '@/lib/framework'
import { OutsourcedApi } from '@/lib/log-outsourced-api'
import { RoleLoadController } from './controller/RoleLoadController'
import { ModuleBuilder } from '../ModuleBuilder'
import { Alertable } from '../alert'
import { ServerValidator } from '../form'

export class RoleModule implements Module {
    private api: OutsourcedApi
    private cModule: Module

    constructor (api: OutsourcedApi, alertable: Alertable, serverValidator: ServerValidator) {
        this.api = api
        this.cModule = (new ModuleBuilder('role'))
            .withCreateAction(() => api.roles(), alertable, serverValidator)
            .withUpdateAction(() => api.roles(), alertable, serverValidator)
            .withDeleteAction(() => api.roles(), alertable)
            .withClearOnProjectOpen()
            .build()
    }

    public boot (context: BootContext): void {
        this.cModule.boot(context)
    }

    public register (context: RegisterContext, store: Store): void {
        this.cModule.register(context, store)
        const repo = store.get('roles')

        context.withController(
            'role@load',
            new RoleLoadController(repo, this.api)
        )
    }
}
