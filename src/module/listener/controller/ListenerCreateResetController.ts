import { Controller } from '@/lib/framework'
import { ObservableProperty, ObservableList } from '@wildebeest/observe-changes'
import { FormField } from '@/lib/form'
import { HandlerEntity } from '@/lib/log-outsourced-api'

export class ListenerCreateResetController implements Controller {
    private createProperty: ObservableProperty<any>
    private handlers: ObservableList<HandlerEntity>

    public constructor (createProperty: ObservableProperty<any>, handlers: ObservableList<HandlerEntity>) {
        this.createProperty = createProperty
        this.handlers = handlers
    }

    public action (data?: any): void {
        this.createProperty.set({
            name: new FormField(''),
            handler: new FormField(this.handlers.get(0) || undefined)
        })
    }
}
