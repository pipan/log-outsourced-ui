import { Store } from './Store'
import { ControllerProvider } from './ControllerProvider'

export interface Module {
    getStore (): Store;
    getControllerProvider (store: Store): ControllerProvider;
}
