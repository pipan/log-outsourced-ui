import { Module, Store, ControllerProvider, Management } from '@/lib/framework'
import { AuthAccessController } from './controller/AuthAccessController'
import { OutsourcedApi } from '@/lib/log-outsourced-api'
import { UnauthorizedController } from './controller/UnauthorizedController'
import { ConnectionCloseController } from './controller/ConnectionCloseController'

export class AuthModule implements Module {
    private api: OutsourcedApi
    private store: Store

    constructor (api: OutsourcedApi) {
        this.api = api
        this.store = (new Store())
            .withRepository('authTokens')
            .withObservable('auth', {
                error: {
                    status: 401
                }
            })
    }

    public getStore (): Store {
        return this.store
    }

    public getControllerProvider (store: Store): ControllerProvider {
        const auth = store.get('auth')
        const tokens = store.get('authTokens')
        return (new Management())
            .withAction(
                'connection@close',
                new ConnectionCloseController(auth)
            )
            .withAction(
                'auth@access',
                new AuthAccessController(tokens, this.api, auth)
            )
            .withAction(
                'error@401',
                new UnauthorizedController(auth)
            )
    }
}
