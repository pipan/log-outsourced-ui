import { Controller } from '@/lib/framework'
import { HandlerApi, HandlerEntity } from '@/lib/log-outsourced-api'
import { ObservableList } from '@wildebeest/observe-changes'

export class HandlerLoadAllController implements Controller {
    private handlerApi: HandlerApi
    private handlers: ObservableList<HandlerEntity>

    public constructor (handlerApi: HandlerApi, handlers: ObservableList<HandlerEntity>) {
        this.handlerApi = handlerApi
        this.handlers = handlers
    }

    public action (data?: any): void {
        this.handlerApi.all()
            .then((handlers: Array<HandlerEntity>) => {
                this.handlers.setAll(handlers)
            })
            .catch((error: any) => {
                console.error(error)
            })
    }
}
