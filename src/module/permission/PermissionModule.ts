import { Module, BootContext, RegisterContext, Store } from '@/lib/framework'
import { OutsourcedApi } from '@/lib/log-outsourced-api'
import { ModuleBuilder } from '../ModuleBuilder'
import { SimpleRepository } from '@wildebeest/repository'
import { Alertable } from '../alert'
import { FormValidator } from '../form'
import { CreateController } from './controller/CreateController'

export class PermissionModule implements Module {
    private api: OutsourcedApi
    private clModule: Module
    private alertable: Alertable

    constructor (api: OutsourcedApi, alertable: Alertable, formValidator: FormValidator) {
        this.api = api
        this.alertable = alertable
        this.clModule = (new ModuleBuilder('permission'))
            .withRepository(SimpleRepository.fromString())
            .withLoadForProjectAction(() => api.permissions())
            .withClearOnProjectOpen()
            .build()
    }

    public boot (context: BootContext): void {
        this.clModule.boot(context)
    }

    public register (context: RegisterContext, store: Store): void {
        this.clModule.register(context, store)
        const repo = store.get('permissions')

        context.withController(
            'permission@create',
            new CreateController(repo, () => this.api.permissions(), this.alertable)
        )
    }
}
