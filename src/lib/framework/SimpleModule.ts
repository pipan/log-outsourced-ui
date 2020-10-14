import { Module } from './Module'
import { ControllerProvider } from './ControllerProvider'
import { Store } from './Store'

export class SimpleModule implements Module {
    private store: Store
    private controllerProvider: ControllerProvider

    constructor (store: Store, controllerProvider: ControllerProvider) {
        this.store = store
        this.controllerProvider = controllerProvider
    }

    public getStore (): Store {
        return this.store
    }

    public getControllerProvider (): ControllerProvider {
        return this.controllerProvider
    }
}
