import { Module } from './Module'
import { ControllerProvider } from './ControllerProvider'
import { Store } from './Store'
import { BootContext } from './BootContext'
import { RegisterContext } from './RegisterContext'

export class SimpleModule implements Module {
    private store: Store
    private controllerProvider: ControllerProvider

    constructor (store: Store, controllerProvider: ControllerProvider) {
        this.store = store
        this.controllerProvider = controllerProvider
    }

    public boot (context: BootContext): void {
        context.withStore(this.store)
    }

    public register (context: RegisterContext, store: Store): void {
        context.withControllerProvider(this.controllerProvider)
    }
}
