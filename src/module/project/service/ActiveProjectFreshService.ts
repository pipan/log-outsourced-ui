import { Service } from '@/lib/framework'
import { ObservableList, ObservableProperty, Closable, ListChange } from '@wildebeest/observe-changes'
import { ProjectEntity } from '@/lib/log-outsourced-api'
import { Channel } from '@/lib/broadcast/Channel'

export class ActiveProjectFreshService implements Service {
    private projects: ObservableList<ProjectEntity>
    private activeProjectProperty: ObservableProperty<ProjectEntity>
    private closables: Array<Closable> = []
    private channel: Channel

    public constructor (projects: ObservableList<ProjectEntity>, activeProjectProperty: ObservableProperty<ProjectEntity>, channel: Channel) {
        this.projects = projects
        this.activeProjectProperty = activeProjectProperty
        this.channel = channel
    }

    public start (): void {
        this.closables.push(
            this.projects.addListener(
                this.onProjectsChange.bind(this)
            )
        )
    }

    public stop (): void {
        console.log('TODO stop')
    }

    private onProjectsChange (change: ListChange<ProjectEntity>): void {
        if (!this.activeProjectProperty.get()) {
            return
        }
        const activeProject: ProjectEntity = this.activeProjectProperty.get()
        for (const project of change.removed()) {
            if (project.getUuid() !== activeProject.getUuid()) {
                continue
            }
            this.channel.dispatch({
                event: 'scene@change',
                data: '/'
            })
        }

        for (const project of change.inserted()) {
            if (project.getUuid() !== activeProject.getUuid()) {
                continue
            }
            this.activeProjectProperty.set(project)
        }
    }
}
