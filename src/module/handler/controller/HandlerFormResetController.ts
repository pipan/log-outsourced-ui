import { Controller } from '@/lib/framework'
import { ObservableMap, ObservableList } from '@wildebeest/observe-changes'
import { HandlerEntity } from '@/lib/log-outsourced-api'

export class HandlerFormResetController implements Controller {
    private handlers: ObservableList<HandlerEntity>
    private forms: ObservableMap<string, any>

    public constructor (handlers: ObservableList<HandlerEntity>, forms: ObservableMap<string, any>) {
        this.handlers = handlers
        this.forms = forms
    }

    public action (): void {
        for (const handler of this.handlers.all()) {
            if (!this.forms.containes(handler.getSlug())) {
                continue
            }
            const formFields: any = this.forms.get(handler.getSlug())
            const meta: any = handler.getMeta()
            for (const field of formFields) {
                const fieldSchema: any = meta.schema[field.id]
                field.props.value = fieldSchema.default || ''
                field.props.error = ''
            }
        }
    }
}
