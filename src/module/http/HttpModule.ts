import { Module, Store, BootContext, RegisterContext } from '@/lib/framework'
import { OpenController } from './controller/OpenController'
import { OutsourcedProxyApi } from '@/lib/log-outsourced-api'
import { ApiFactory } from './ApiFactory'
import { Channel, ProxyChannel } from '@wildebeest/observable'

export class HttpModule implements Module {
    private api: OutsourcedProxyApi
    private interceptor: Channel<any>
    private factory: ApiFactory

    constructor () {
        this.api = new OutsourcedProxyApi()
        this.interceptor = new ProxyChannel()
        this.factory = new ApiFactory(this.interceptor)
    }

    public boot (context: BootContext): void {
        context.withStore(new Store())
    }

    public register (context: RegisterContext, store: Store): void {
        const connections = store.get('connections')
        const authTokens = store.get('authTokens')

        context.withController(
            'connection@open',
            new OpenController(connections, this.api, authTokens, this.factory)
        )

        this.interceptor.connectFn((event: any) => {
            context.getDispatcher().dispatch({
                event: 'http@' + event.status,
                data: event.response
            })
        })
    }

    public getApi (): OutsourcedProxyApi {
        return this.api
    }

    public getApiFactory (): ApiFactory {
        return this.factory
    }
}
