import { Module } from '@/lib/framework'
import { Context } from '@/lib/framework/module/Context'
import { HandlerApi } from '@/lib/log-outsourced-api/domain/handler/HandlerApi'
import { ObservableList, SimpleObservableList, MapEntry } from '@wildebeest/observe-changes'
import { HandlerEntity } from '@/lib/log-outsourced-api'
import { HandlerLoadAllController } from './controller/HandlerLoadAllController'

export class HandlerModule implements Module {
    protected handlerApi: HandlerApi

    public constructor (handlerApi: HandlerApi) {
        this.handlerApi = handlerApi
    }

    public install (context: Context): void {
        const handlers: ObservableList<HandlerEntity> = new SimpleObservableList()

        context.observables().add('handlers', handlers)

        context.controllers().addList([
            new MapEntry('handler@load.all', new HandlerLoadAllController(this.handlerApi, handlers))
        ])

        context.channel().dispatch({ event: 'handler@load.all' })
    }
}
