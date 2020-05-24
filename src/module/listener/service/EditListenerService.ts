import { Service } from '@/lib/framework'
import { ObservableProperty, Closable, PropertyChange } from '@wildebeest/observe-changes'
import { ListenerEntity } from '@/lib/log-outsourced-api'

export class EditListenerService implements Service {
    private openedListener: ObservableProperty<ListenerEntity>
    private editModel: ObservableProperty<any>
    private closables: Array<Closable> = []
    private models: Map<string, any> = new Map()

    public constructor (openedListener: ObservableProperty<ListenerEntity>, editModel: ObservableProperty<any>) {
        this.openedListener = openedListener
        this.editModel = editModel
    }

    public start (): void {
        this.closables.push(
            this.openedListener.addListenerAndCall(
                this.onOpeenListener.bind(this)
            )
        )
    }

    private onOpeenListener (change: PropertyChange<ListenerEntity>): void {
        const listener: ListenerEntity | undefined = change.next()
        if (!listener) {
            this.editModel.set(null)
            return
        }

        if (this.models.has(listener.getUuid())) {
            this.editModel.set(
                this.models.get(listener.getUuid())
            )
            return
        }

        const model: any = {
            name: listener.getName(),
            project_uuid: listener.getProjecUuid(),
            rules: [...listener.getRules()],
            handler: {
                slug: listener.getHandlerSlug(),
                values: listener.getHandlerValues()
            }
        }
        this.models.set(listener.getUuid(), model)
        this.editModel.set(model)
    }

    public stop (): void {
        for (const closable of this.closables) {
            closable.close()
        }
    }
}
