import { Controller } from '@/lib/framework'
import { ObservableProperty } from '@wildebeest/observe-changes'
import { FormField } from '@/lib/form'

export class ListenerCreateResetController implements Controller {
    private createProperty: ObservableProperty<any>

    public constructor (createProperty: ObservableProperty<any>) {
        this.createProperty = createProperty
    }

    public action (data?: any): void {
        this.createProperty.set({
            name: new FormField(''),
            handler: new FormField('')
        })
    }
}
