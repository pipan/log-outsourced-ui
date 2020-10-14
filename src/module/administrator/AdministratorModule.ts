import { Module, Store, ControllerProvider, Management } from '@/lib/framework'
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

    public getStore (): Store {
        return this.dModule.getStore()
    }

    public getControllerProvider (store: Store): ControllerProvider {
        const repo = store.get('administrators')
        return (new Management())
            .withProvider(this.dModule.getControllerProvider(store))
            .withAction(
                'administrator@load',
                new AdministratorLoadController(repo, this.api)
            )
            .withAction(
                'administrator@invite',
                new AdministratorInviteController(repo, this.api)
            )
    }
}
