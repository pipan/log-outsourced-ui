import { Controller } from '@/lib/framework'
import { ListenerEntity } from '@/lib/log-outsourced-api'
import { ObservableList } from '@wildebeest/observe-changes'

export class ListenerSetAllController implements Controller {
    private listener: ObservableList<ListenerEntity>

    public constructor (listners: ObservableList<ListenerEntity>) {
        this.listener = listners
    }

    public action (data: Array<ListenerEntity>): void {
        this.listener.setAll(data)
    }
}
