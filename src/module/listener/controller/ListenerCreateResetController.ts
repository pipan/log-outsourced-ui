import { Controller } from '@/lib/framework'
import { ObservableProperty } from '@wildebeest/observe-changes'

export class ListenerCreateResetController implements Controller {
    private createProperty: ObservableProperty<any>

    public constructor (createProperty: ObservableProperty<any>) {
        this.createProperty = createProperty
    }

    public action (data?: any): void {
        this.createProperty.set({
            name: '',
            rules: [],
            handler: {
                slug: '',
                values: {}
            }
        })
    }
}
