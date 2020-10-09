import { Action } from './Action'

export class ChainAction<T> implements Action<T> {
    private actions: Action<T>[] = []

    constructor (actions: Action<T>[]) {
        this.actions = actions
    }

    public activate (data: T): T {
        for (const a of this.actions) {
            data = a.activate(data)
        }
        return data
    }
}
