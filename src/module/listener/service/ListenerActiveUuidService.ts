import { Service } from '@/lib/framework'
import { Closable, ObservableProperty, ObservableList } from '@wildebeest/observe-changes'
import { ListenerEntity } from '@/lib/log-outsourced-api'

export class ListenerActiveUuidService implements Service {
    private listener: ObservableProperty<ListenerEntity | null>
    private listeners: ObservableList<ListenerEntity>
    private uuid: ObservableProperty<string>

    private closables: Array<Closable> = []

    public constructor (listener: ObservableProperty<ListenerEntity>, listeners: ObservableList<ListenerEntity>, uuid: ObservableProperty<string>) {
        this.listener = listener
        this.listeners = listeners
        this.uuid = uuid
    }

    public start (): void {
        this.closables.push(
            this.listeners.addListener(
                this.onAnyChange.bind(this)
            )
        )

        this.closables.push(
            this.uuid.addListener(
                this.onAnyChange.bind(this)
            )
        )
    }

    public stop (): void {
        for (const closable of this.closables) {
            closable.close()
        }
    }

    private onAnyChange (): void {
        if (this.uuid.get() === '') {
            this.listener.set(null)
            return
        }

        for (const listener of this.listeners.all()) {
            if (listener.getUuid() === this.uuid.get()) {
                this.listener.set(listener)
                return
            }
        }
        this.listener.set(null)
    }
}
