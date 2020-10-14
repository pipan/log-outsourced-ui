import { Store, Module } from '@/lib/framework'
import { Management } from './Management'

export class Kernel {
    private store: Store = new Store()
    private management: Management = new Management()

    public getStore (): Store {
        return this.store
    }

    public boot (modules: Module[]): void {
        for (const module of modules) {
            this.store = this.store.withStore(module.getStore())
        }

        for (const module of modules) {
            this.management = this.management.withProvider(module.getControllerProvider(this.store))
        }
    }

    public process (key: string, payload: any): void {
        const actions = this.management.getActions()
        if (!actions[key]) {
            console.warn('Action was not found: ' + key)
            return
        }

        for (const action of actions[key]) {
            action.action(payload)
        }
    }
}
