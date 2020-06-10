import { Service, PropertyEntity } from '@/lib/framework'
import { ProjectEntity } from '@/lib/log-outsourced-api'
import { Closable } from '@wildebeest/observable'
import { Repository, QueryResult } from '@wildebeest/repository'

export class ActiveProjectService implements Service {
    private properties: Repository<PropertyEntity>
    private projects: Repository<ProjectEntity>
    private projectQuery: QueryResult<ProjectEntity> | null
    private closables: Array<Closable> = []

    public constructor (projects: Repository<ProjectEntity>, properties: Repository<PropertyEntity>) {
        this.projects = projects
        this.properties = properties
        this.projectQuery = null
    }

    public start (): void {
        const propertiesResult = this.properties.query()
            .property('project.active.uuid')

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
        if (this.projectQuery) {
            this.projectQuery.close()
        }
        this.projectQuery = this.projects.query()
            .property(property.get())
        this.projectQuery.connectFn((entity: ProjectEntity) => {
            this.properties.insert(
                new PropertyEntity('project.active', entity)
            )
        })
    }
}
