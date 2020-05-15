import { Adapter } from './Adapter'

export class ListAdapter<T, U> implements Adapter<Array<T>, Array<U>> {
    private itemAdapter: Adapter<T, U>;

    public constructor (itemAdapter: Adapter<T, U>) {
        this.itemAdapter = itemAdapter
    }

    public adapt (items: Array<T>): Array<U> {
        const result: Array<U> = []
        for (const item of items) {
            result.push(
                this.itemAdapter.adapt(item)
            )
        }
        return result
    }
}
