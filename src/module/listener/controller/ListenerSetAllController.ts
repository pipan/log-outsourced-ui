import { Controller } from '@/lib/framework'
import { ListenerEntity } from '@/lib/log-outsourced-api'
import { Repository } from '@wildebeest/repository'

export class ListenerSetAllController implements Controller {
    private listeners: Repository<ListenerEntity>

    public constructor (listeners: Repository<ListenerEntity>) {
        this.listeners = listeners
    }

    public action (data: Array<ListenerEntity>): void {
        this.listeners.setAll(data)
    }
}
