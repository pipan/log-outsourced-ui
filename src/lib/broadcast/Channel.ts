import { Listenable } from './Listenable'
import { Dispatchable } from './Dispachable'
import { Closable } from './Closable'
import { ListenerRef } from './ListenerRef'
import { Listener } from './Listener'

export class Channel implements Listenable, Dispatchable {
    protected listeners: Array<Listener> = []

    public addListener (listener: Listener): Closable {
        this.listeners.push(listener)
        return new ListenerRef(this, listener)
    }

    public removeListener (listener: Listener): void {
        const index: number = this.listeners.indexOf(listener)
        if (index < 0) {
            return
        }
        this.listeners.splice(index, 1)
    }

    public dispatch (data: any): void {
        for (const listener of this.listeners) {
            listener.handle(data)
        }
    }
}
