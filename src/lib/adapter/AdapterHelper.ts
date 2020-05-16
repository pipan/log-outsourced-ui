import { Adapter } from './Adapter'
import { ListAdapter } from './ListAdapter'

export class AdapterHelper {
    public static listOf<T, U> (itemAdapter: Adapter<T, U>): Adapter<Array<T>, Array<U>> {
        return new ListAdapter(itemAdapter)
    }
}
