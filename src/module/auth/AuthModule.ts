import { Module, Store, BootContext, RegisterContext } from '@/lib/framework'
import { AuthAccessController } from './controller/AuthAccessController'
import { OutsourcedApi } from '@/lib/log-outsourced-api'
import { UnauthorizedController } from './controller/UnauthorizedController'
import { ConnectionCloseController } from './controller/ConnectionCloseController'

export class AuthModule implements Module {
    private api: OutsourcedApi

    constructor (api: OutsourcedApi) {
        this.api = api
    }

    public boot (context: BootContext): void {
        context.withStore(
            (new Store())
                .withRepository('authTokens')
                .withObservable('auth', {
                    error: {
                        status: 401
                    }
                })
        )
    }

    public register (context: RegisterContext, store: Store): void {
        const auth = store.get('auth')
        const tokens = store.get('authTokens')

        context.withController(
                'connection@close',
                new ConnectionCloseController(auth)
            )
            .withController(
                'auth@access',
                new AuthAccessController(tokens, this.api, auth)
            )
            .withController(
                'http@401',
                new UnauthorizedController(auth)
            )
    }
}
