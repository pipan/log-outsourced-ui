import { Closable } from './Closable'
import { Listenable } from './Listenable'
import { Listener } from './Listener'

export class ListenerRef implements Closable {
    private listenable!: Listenable
    private listener!: Listener

    public constructor (
        listenable: Listenable,
        listener: Listener
    ) {
        this.listenable = listenable
        this.listener = listener
    }

    public close (): void {
        this.listenable.removeListener(this.listener)
    }
}
