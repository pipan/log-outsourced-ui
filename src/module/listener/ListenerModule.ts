import { Module, BootContext, RegisterContext, Store } from '@/lib/framework'
import { OutsourcedApi } from '@/lib/log-outsourced-api'
import { Alertable } from '../alert'
import { ModuleBuilder } from '../ModuleBuilder'
import { LoadForProjectController } from '../LoadForProjectController'
import { TestController } from './controller/TestController'

export class ListenerModule implements Module {
    private api: OutsourcedApi
    private alertable: Alertable
    private cudModule: Module

    public constructor (api: OutsourcedApi, alertable: Alertable) {
        this.api = api
        this.alertable = alertable
        this.cudModule = (new ModuleBuilder('listener'))
            .withCreateAction(() => api.listeners(), alertable)
            .withDeleteAction(() => api.listeners(), alertable)
            .withUpdateAction(() => api.listeners(), alertable)
            .build()
    }

    public boot (context: BootContext): void {
        this.cudModule.boot(context)
    }

    public register (context: RegisterContext, store: Store): void {
        this.cudModule.register(context, store)

        const repo = store.get('listeners')

        context.withController(
                'listener@load',
                new LoadForProjectController(repo, () => this.api.listeners())
            )
            .withController(
                'log@test',
                new TestController(() => this.api.log(), this.alertable)
            )
    }
}
