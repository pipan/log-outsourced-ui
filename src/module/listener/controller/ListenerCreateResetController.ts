import { Controller } from '@/lib/framework'
import { ObservableProperty, ObservableList, ObservableMap } from '@wildebeest/observe-changes'
import { FormField } from '@/lib/form'
import { HandlerEntity } from '@/lib/log-outsourced-api'
import { Channel } from '@/lib/broadcast/Channel'

export class ListenerCreateResetController implements Controller {
    private createProperty: ObservableProperty<any>
    private handlers: ObservableList<HandlerEntity>
    private channel: Channel

    public constructor (createProperty: ObservableProperty<any>, handlers: ObservableList<HandlerEntity>, channel: Channel) {
        this.createProperty = createProperty
        this.handlers = handlers
        this.channel = channel
    }

    public action (data?: any): void {
        this.createProperty.set({
            name: new FormField(''),
            handler: new FormField(this.handlers.get(0) || undefined)
        })

        this.channel.dispatch({ event: 'handler.form@reset' })
    }
}
