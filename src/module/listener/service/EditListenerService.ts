import { Service, PropertyEntity } from '@/lib/framework'
import { ListenerEntity } from '@/lib/log-outsourced-api'
import { Closable } from '@wildebeest/observable'
import { Repository } from '@wildebeest/repository'

export class EditListenerService implements Service {
    private properties: Repository<PropertyEntity>
    // private editModel: ObservableProperty<any>
    private closables: Array<Closable> = []
    private models: Map<string, any> = new Map()

    public constructor (properties: Repository<PropertyEntity>) {
        this.properties = properties
        // this.editModel = editModel
    }

    public start (): void {
        const query = this.properties.query()
            .property('listener.active')

        query.connectFn((property: PropertyEntity) => {
            this.onListenerChange(property.get())
        })

        this.closables.push(query)
    }

    private onListenerChange (listener: ListenerEntity): void {
        if (!listener) {
            this.properties.insert(
                new PropertyEntity('listener.edit', undefined)
            )
            return
        }

        if (this.models.has(listener.getUuid())) {
            this.properties.insert(
                new PropertyEntity('listener.edit', this.models.get(listener.getUuid()))
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
        this.properties.insert(
            new PropertyEntity('listener.edit', model)
        )
    }

    public stop (): void {
        for (const closable of this.closables) {
            closable.close()
        }
    }
}
