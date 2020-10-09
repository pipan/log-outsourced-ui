import { Closable, StatefulChannel } from '@wildebeest/observable'

export class PropertyWatcher<T> {
    private closable: Closable | null = null
    private fn: (item: T) => void

    constructor (fn: (item: T) => void) {
        this.fn = fn
    }

    public watch (property: StatefulChannel<T>): PropertyWatcher<T> {
        this.stop()
        this.closable = property.connectFn(this.fn)

        return this
    }

    public stop (): PropertyWatcher<T> {
        if (!this.closable) {
            return this
        }

        this.closable.close()
        return this
    }
}
