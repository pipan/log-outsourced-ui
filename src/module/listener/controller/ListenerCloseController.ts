import { Controller, PropertyEntity } from '@/lib/framework'
import { Repository } from '@wildebeest/repository'

export class ListenerCloseController implements Controller {
    private properties: Repository<PropertyEntity>

    public constructor (properties: Repository<PropertyEntity>) {
        this.properties = properties
    }

    public action (data?: any): void {
        this.properties.insert(
            new PropertyEntity('listener.active.uuid', undefined)
        )
    }
}
