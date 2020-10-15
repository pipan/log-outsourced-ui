import { Store } from './Store'
import { BootContext } from './BootContext'
import { RegisterContext } from './RegisterContext'

export interface Module {
    boot (context: BootContext): void;
    register (context: RegisterContext, store: Store): void;
}
