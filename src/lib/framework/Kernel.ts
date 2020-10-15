import { Store, Module } from '@/lib/framework'
import { Management } from './Management'
import { Controller } from './controller/Controller'
import { ControllerProvider } from './ControllerProvider'
import { RegisterContext } from './RegisterContext'
import { BootContext } from './BootContext'
import { Dispatchable, Channel, ProxyChannel } from '@wildebeest/observable'

export class Kernel implements RegisterContext, BootContext {
    private store: Store = new Store()
    private management: Management = new Management()
    private channel: Channel<any> = new ProxyChannel()

    constructor () {
        this.channel.connectFn((event: any) => {
            this.process(event.event, event.data)
        })
    }

    public getStore (): Store {
        return this.store
    }

    public withStore (store: Store): BootContext {
        this.store = this.store.withStore(store)
        return this
    }

    public withControllerProvider (provider: ControllerProvider): RegisterContext {
        this.management = this.management.withProvider(provider)
        return this
    }

    public withController (key: string, controller: Controller): RegisterContext {
        this.management = this.management.withAction(key, controller)
        return this
    }

    public getDispatcher (): Dispatchable<any> {
        return this.channel
    }

    public boot (modules: Module[]): void {
        for (const module of modules) {
            module.boot(this)
        }

        for (const module of modules) {
            module.register(this, this.store)
        }
    }

    public process (key: string, payload: any): void {
        const actions = this.management.getActions()
        if (!actions[key]) {
            console.debug('Action was not found: ' + key)
            return
        }

        for (const action of actions[key]) {
            action.action(payload)
        }
    }
}
