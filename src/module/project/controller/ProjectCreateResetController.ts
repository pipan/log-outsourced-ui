import { Controller } from '@/lib/framework'
import { ObservableProperty } from '@wildebeest/observe-changes'

export class ProjectCreateResetController implements Controller {
    private projectCreate: ObservableProperty<any>

    public constructor (projectCreate: ObservableProperty<any>) {
        this.projectCreate = projectCreate
    }

    public action (data?: any): void {
        this.projectCreate.set({ name: '' })
    }
}
