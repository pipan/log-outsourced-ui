import { Service, PropertyEntity } from '@/lib/framework'
import { ProjectEntity } from '@/lib/log-outsourced-api'
import { Repository } from '@wildebeest/repository'
import { Closable } from '@wildebeest/observable'

export class ApiProjectRouteService implements Service {
    private properties: Repository<PropertyEntity>
    private host: string
    private closables: Array<Closable>

    public constructor (properties: Repository<PropertyEntity>, host: string) {
        this.properties = properties
        this.host = host
        this.closables = []
    }

    public start (): void {
        const propertyResult = this.properties.query()
            .property('project.active')

        this.closables.push(
            propertyResult.connectFn(
                this.onActiveProjectChange.bind(this)
            )
        )

        this.closables.push(propertyResult)
    }

    public stop (): void {
        for (const closable of this.closables) {
            closable.close()
        }
    }

    private onActiveProjectChange (projectProperty: PropertyEntity): void {
        const project: ProjectEntity = projectProperty.get()
        if (project === undefined) {
            this.properties.insert(new PropertyEntity('api', undefined))
            return
        }
        this.properties.insert(new PropertyEntity('api', {
            url: this.host + '/logs/' + project.getUuid()
        }))
    }
}
