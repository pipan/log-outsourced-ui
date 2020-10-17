import { Module, Store, BootContext, RegisterContext } from '@/lib/framework'
import { AdministratorLoadController } from './controller/AdministratorLoadController'
import { OutsourcedApi } from '@/lib/log-outsourced-api'
import { AdministratorInviteController } from './controller/AdministratorInviteController'
import { ModuleBuilder } from '../ModuleBuilder'
import { Alertable } from '../alert'

export class AdministratorModule implements Module {
    private api: OutsourcedApi
    private alertable: Alertable
    private dModule: Module

    public constructor (api: OutsourcedApi, alertable: Alertable) {
        this.api = api
        this.alertable = alertable
        this.dModule = (new ModuleBuilder('administrator'))
            .withDeleteAction(() => this.api.administrators(), alertable)
            .build()
    }

    public boot (context: BootContext): void {
        this.dModule.boot(context)
    }

    public register (context: RegisterContext, store: Store): void {
        this.dModule.register(context, store)

        const repo = store.get('administrators')
        context.withController(
                'administrator@load',
                new AdministratorLoadController(repo, this.api)
            )
            .withController(
                'administrator@invite',
                new AdministratorInviteController(repo, this.api)
            )
    }
}
