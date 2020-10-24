import { Module, Store, BootContext, RegisterContext } from '@/lib/framework'
import { AuthAccessController } from './controller/AuthAccessController'
import { OutsourcedApi } from '@/lib/log-outsourced-api'

export class AuthModule implements Module {
    private api: OutsourcedApi

    constructor (api: OutsourcedApi) {
        this.api = api
    }

    public boot (context: BootContext): void {
        context.withStore(
            (new Store())
                .withRepository('authTokens')
        )
    }

    public register (context: RegisterContext, store: Store): void {
        const error = store.get('error')
        const tokens = store.get('authTokens')

        context.withController(
            'auth@access',
            new AuthAccessController(tokens, this.api, error)
        )
    }
}
