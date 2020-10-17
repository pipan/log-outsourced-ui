import { Store } from './Store'

export interface BootContext {
    withStore (store: Store): BootContext;
}
