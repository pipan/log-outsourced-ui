import { Module, BootContext, RegisterContext, Store } from '@/lib/framework'
import { OutsourcedApi } from '@/lib/log-outsourced-api'
import { LoadController } from '../LoadController'

export class HandlerModule implements Module {
    protected api: OutsourcedApi
    private store: Store

    public constructor (api: OutsourcedApi) {
        this.api = api
        this.store = (new Store())
            .withRepository('handlers', 'slug')
    }

    public boot (context: BootContext): void {
        context.withStore(this.store)
    }

    public register (context: RegisterContext, store: Store): void {
        const repo = store.get('handlers')

        context.withController('handler@load', new LoadController(repo, () => this.api.handlers()))
    }
}
