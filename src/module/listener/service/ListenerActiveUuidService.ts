import { Service, PropertyEntity } from '@/lib/framework'
import { ListenerEntity } from '@/lib/log-outsourced-api'
import { Closable } from '@wildebeest/observable'
import { Repository, QueryResult } from '@wildebeest/repository'

export class ListenerActiveUuidService implements Service {
    private properties: Repository<PropertyEntity>
    private listeners: Repository<ListenerEntity>
    private listenerQuery: QueryResult<ListenerEntity> | null
    private closables: Array<Closable> = []

    public constructor (listeners: Repository<ListenerEntity>, properties: Repository<PropertyEntity>) {
        this.listeners = listeners
        this.properties = properties
        this.listenerQuery = null
    }

    public start (): void {
        const propertiesResult = this.properties.query()
            .property('listener.active.uuid')

        this.closables.push(
            propertiesResult.connectFn(
                this.onUuidChange.bind(this)
            )
        )
        this.closables.push(propertiesResult)
    }

    public stop (): void {
        for (const closable of this.closables) {
            closable.close()
        }
    }

    private onUuidChange (property: PropertyEntity): void {
        if (this.listenerQuery) {
            this.listenerQuery.close()
        }
        this.listenerQuery = this.listeners.query()
            .property(property.get())
        this.listenerQuery.connectFn((entity: ListenerEntity) => {
            this.properties.insert(
                new PropertyEntity('listener.active', entity)
            )
        })
    }
}
