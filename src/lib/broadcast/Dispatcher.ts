import { Dispatchable } from './Dispachable'

export interface Dispatcher {
    channel (name: string): Dispatchable;
}
