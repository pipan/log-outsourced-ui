import { Service } from '@/lib/framework'
import { ObservableProperty, Closable, PropertyChange } from '@wildebeest/observe-changes'
import { ProjectEntity } from '@/lib/log-outsourced-api'

export class ActiveProjectService implements Service {
    private activeProject: ObservableProperty<ProjectEntity | null>
    private activeProjectUuid: ObservableProperty<string>
    private closables: Array<Closable> = []

    public constructor (activeProjectUuid: ObservableProperty<string>, activeProject: ObservableProperty<ProjectEntity>) {
        this.activeProject = activeProject
        this.activeProjectUuid = activeProjectUuid
    }

    public start (): void {
        this.closables.push(
            this.activeProjectUuid.addListener(
                this.onProjectUuidChange.bind(this)
            )
        )
    }

    public stop (): void {
        for (const closable of this.closables) {
            closable.close()
        }
    }

    private onProjectUuidChange (change: PropertyChange<string>): void {
        if (change.next() === '') {
            this.activeProject.set(null)
            return
        }
        
    }
}
