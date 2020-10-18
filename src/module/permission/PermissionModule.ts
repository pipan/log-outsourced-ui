import { Module, BootContext, RegisterContext, Store } from '@/lib/framework'
import { OutsourcedApi } from '@/lib/log-outsourced-api'
import { LoadForProjectController } from '../LoadForProjectController'
import { ClearController } from '../ClearController'

export class PermissionModule implements Module {
    private api: OutsourcedApi
    private store: Store

    constructor (api: OutsourcedApi) {
        this.api = api
        this.store = (new Store())
            .withStringRepository('permissions')
    }

    public boot (context: BootContext): void {
        context.withStore(this.store)
    }

    public register (context: RegisterContext, store: Store): void {
        const repo = store.get('permissions')

        context.withController(
                'permission@load',
                new LoadForProjectController(repo, () => this.api.permissions())
            )
            .withController(
                'project@open',
                new ClearController(repo)
            )
    }
}
