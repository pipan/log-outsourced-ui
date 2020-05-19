import { Service } from '@/lib/framework'
import { ObservableList, ObservableMap, ListChange } from '@wildebeest/observe-changes'
import { HandlerEntity } from '@/lib/log-outsourced-api'

export class HandlerFormService implements Service {
    private handlers: ObservableList<HandlerEntity>
    private forms: ObservableMap<string, any>

    public constructor (handlers: ObservableList<HandlerEntity>, forms: ObservableMap<string, any>) {
        this.forms = forms
        this.handlers = handlers
    }

    public start (): void {
        this.handlers.addListenerAndCall((change: ListChange<HandlerEntity>) => {
            for (const handler of change.inserted()) {
                const meta: any = handler.getMeta()
                const fields: Array<any> = []
                for (const fieldSchemaKey in meta.schema) {
                    const fieldSchema: any = meta.schema[fieldSchemaKey]
                    fields.push({
                        type: fieldSchema.type,
                        id: fieldSchemaKey,
                        props: {
                            label: fieldSchema.name,
                            value: fieldSchema.default || '',
                            error: ''
                        }
                    })
                }
                this.forms.add(handler.getSlug(), fields)
            }
        })
    }

    public stop (): void {
        console.log('TODO stop')
    }
}
