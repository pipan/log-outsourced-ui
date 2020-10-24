import { Module, BootContext, RegisterContext, Store } from '@/lib/framework'
import { LoadForProjectController } from '../LoadForProjectController'
import { OutsourcedApi } from '@/lib/log-outsourced-api'
import { SaveController } from './controller/SaveController'
import { Alertable } from '../alert'

export class DefaultRoleModule implements Module {
    private store: Store
    private api: OutsourcedApi
    private alertable: Alertable

    constructor (api: OutsourcedApi, alertable: Alertable) {
        this.api = api
        this.alertable = alertable
        this.store = (new Store())
            .withStringRepository('defaultroles')
    }

    public boot (context: BootContext): void {
        context.withStore(this.store)
    }

    public register (context: RegisterContext, store: Store): void {
        const repo = store.get('defaultroles')

        context.withController(
                'defaultrole@load',
                new LoadForProjectController(repo, () => this.api.defaultRoles())
            )
            .withController(
                'defaultrole@save',
                new SaveController(repo, () => this.api.defaultRoles(), this.alertable)
            )
    }
}
