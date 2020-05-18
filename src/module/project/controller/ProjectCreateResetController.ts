import { Controller } from '@/lib/framework'
import { ObservableProperty } from '@wildebeest/observe-changes'
import { FormField } from '@/lib/form'

export class ProjectCreateResetController implements Controller {
    private projectCreate: ObservableProperty<any>

    public constructor (projectCreate: ObservableProperty<any>) {
        this.projectCreate = projectCreate
    }

    public action (data?: any): void {
        this.projectCreate.set({
            name: new FormField('')
        })
    }
}
