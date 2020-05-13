import { Closable } from './Closable'
import { Listener } from './Listener'

export interface Listenable {
    addListener (listener: Listener): Closable;
    removeListener (listener: Listener): void;
}
