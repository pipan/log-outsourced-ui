import { Module } from '@/lib/framework'
import { Context } from '@/lib/framework/module/Context'
import { HandlerApi } from '@/lib/log-outsourced-api/domain/handler/HandlerApi'

export class HandlerModule implements Module {
    protected handlerApi: HandlerApi

    public constructor (handlerApi: HandlerApi) {
        this.handlerApi = handlerApi
    }

    public install (context: Context): void {
        this.handlerApi.all()
            .then(handlers => console.log('handlers', handlers))
    }
}
