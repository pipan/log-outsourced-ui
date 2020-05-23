import { Service } from '@/lib/framework'
import { ObservableList, ObservableMap, ListChange, Closable } from '@wildebeest/observe-changes'
import { HandlerEntity } from '@/lib/log-outsourced-api'

export class HandlerFormService implements Service {
    private handlers: ObservableList<HandlerEntity>
    private options: ObservableList<any>
    private forms: ObservableMap<string, any>
    private closables: Array<Closable> = []

    public constructor (handlers: ObservableList<HandlerEntity>, forms: ObservableMap<string, any>, options: ObservableList<any>) {
        this.forms = forms
        this.handlers = handlers
        this.options = options
    }

    public start (): void {
        this.closables.push(
            this.handlers.addListenerAndCall(
                this.onHandlerChange.bind(this)
            )
        )
    }

    private onHandlerChange (change: ListChange<HandlerEntity>): void {
        const options: Array<any> = []
        for (const handler of this.handlers.all()) {
            options.push({
                id: handler.getSlug(),
                label: handler.getName(),
                value: handler.getSlug()
            })
        }
        this.options.setAll(options)

        for (const handler of change.inserted()) {
            const meta: any = handler.getMeta()
            const fields: Array<any> = []
            for (const fieldSchemaKey in meta.schema) {
                const fieldSchema: any = meta.schema[fieldSchemaKey]
                fields.push({
                    type: fieldSchema.type,
                    id: fieldSchemaKey,
                    default: fieldSchema.default || '',
                    props: {
                        label: fieldSchema.name,
                        error: '',
                        options: fieldSchema.options || []
                    }
                })
            }
            this.forms.add(handler.getSlug(), fields)
        }
    }

    public stop (): void {
        for (const closable of this.closables) {
            closable.close()
        }
    }
}
