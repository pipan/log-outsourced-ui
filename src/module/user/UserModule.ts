import { Module, BootContext, Store, RegisterContext } from '@/lib/framework'
import { OutsourcedApi } from '@/lib/log-outsourced-api'
import { UserLoadController } from './controller/UserLoadController'
import { ModuleBuilder } from '../ModuleBuilder'
import { Alertable } from '../alert'
import { FormValidator } from '../form'

export class UserModule implements Module {
    private api: OutsourcedApi
    private cModule: Module

    constructor (api: OutsourcedApi, alertable: Alertable, FormValidator: FormValidator) {
        this.api = api

        this.cModule = (new ModuleBuilder('user'))
            .withCreateAction(() => api.users(), alertable, FormValidator)
            .withUpdateAction(() => api.users(), alertable, FormValidator)
            .withDeleteAction(() => api.users(), alertable)
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
    }
}
