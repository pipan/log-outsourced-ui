import { Module, BootContext, Store, RegisterContext } from '@/lib/framework'
import { OutsourcedApi } from '@/lib/log-outsourced-api'
import { UserLoadController } from './controller/UserLoadController'
import { ModuleBuilder } from '../ModuleBuilder'
import { Alertable } from '../alert'
import { FormValidator } from '../form'
import { UserDisableController } from './controller/UserDisableController'

export class UserModule implements Module {
    private api: OutsourcedApi
    private alertable: Alertable
    private cModule: Module

    constructor (api: OutsourcedApi, alertable: Alertable, FormValidator: FormValidator) {
        this.api = api
        this.alertable = alertable

        this.cModule = (new ModuleBuilder('user'))
            .withCreateAction(() => api.users(), alertable, FormValidator)
            .withUpdateAction(() => api.users(), alertable, FormValidator)
            .withClearOnProjectOpen()
            .build()
    }

    public boot (context: BootContext): void {
        this.cModule.boot(context)
    }

    public register (context: RegisterContext, store: Store): void {
        this.cModule.register(context, store)
        const repo = store.get('users')

        context.withController(
                'user@load',
                new UserLoadController(repo, this.api)
            )
            .withController(
                'user@disable',
                new UserDisableController(repo, () => this.api.users(), this.alertable)
            )
    }
}
