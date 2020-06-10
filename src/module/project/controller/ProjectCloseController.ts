import { Controller, PropertyEntity } from '@/lib/framework'
import { Repository } from '@wildebeest/repository'
import { Channel } from '@wildebeest/observable'

export class ProjectCloseController implements Controller {
    private properties: Repository<PropertyEntity>
    private channel: Channel<any>

    public constructor (properties: Repository<PropertyEntity>, channel: Channel<any>) {
        this.properties = properties
        this.channel = channel
    }

    public action (): void {
        this.channel.dispatch({
            event: 'listener@set.all',
            data: []
        })
        this.properties.insert(
            new PropertyEntity('project.active.uuid', undefined)
        )
    }
}
