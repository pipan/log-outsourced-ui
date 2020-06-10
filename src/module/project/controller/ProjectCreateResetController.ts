import { Controller, PropertyEntity } from '@/lib/framework'
import { FormField } from '@/lib/form'
import { Repository } from '@wildebeest/repository'

export class ProjectCreateResetController implements Controller {
    private properties: Repository<PropertyEntity>

    public constructor (properties: Repository<PropertyEntity>) {
        this.properties = properties
    }

    public action (data?: any): void {
        this.properties.insert(
            new PropertyEntity('project.create', {
                name: new FormField('')
            })
        )
    }
}
