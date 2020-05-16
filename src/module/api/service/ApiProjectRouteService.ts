import { Service } from '@/lib/framework'
import { ObservableProperty, PropertyChange } from '@wildebeest/observe-changes'
import { ProjectEntity } from '@/lib/log-outsourced-api'

export class ApiProjectRouteService implements Service {
    private api: ObservableProperty<any>
    private activeProject: ObservableProperty<ProjectEntity>
    private host: string

    public constructor (api: ObservableProperty<any>, activeProject: ObservableProperty<ProjectEntity>, host: string) {
        this.activeProject = activeProject
        this.api = api
        this.host = host
    }

    public start (): void {
        // TODO: close
        this.activeProject.addListenerAndCall(
            this.onActiveProjectChange.bind(this)
        )
    }

    public stop (): void {
        console.log('TODO stop')
    }

    private onActiveProjectChange (change: PropertyChange<ProjectEntity>): void {
        const project: ProjectEntity = change.next()
        if (project === null) {
            this.api.get().url = ''
            return
        }
        this.api.get().url = this.host + '/logs/' + project.getUuid()
    }
}
