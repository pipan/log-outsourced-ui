import { Controller, PropertyEntity } from '@/lib/framework'
import { Repository } from '@wildebeest/repository'

export class ListenerOpenController implements Controller {
    private properties: Repository<PropertyEntity>

    public constructor (properties: Repository<PropertyEntity>) {
        this.properties = properties
    }

    public action (uuid: string): void {
        this.properties.insert(
            new PropertyEntity('listener.active.uuid', uuid)
        )
    }
}
