import { Module } from '@/lib/framework'
import { Context } from '@/lib/framework/module/Context'
import { HandlerApi } from '@/lib/log-outsourced-api/domain/handler/HandlerApi'
import { ObservableList, SimpleObservableList, MapEntry, ObservableMap, SimpleObservableMap } from '@wildebeest/observe-changes'
import { HandlerEntity } from '@/lib/log-outsourced-api'
import { HandlerLoadAllController } from './controller/HandlerLoadAllController'
import { HandlerFormService } from './service/HandlerFormService'
import { HandlerFormResetController } from './controller/HandlerFormResetController'

export class HandlerModule implements Module {
    protected handlerApi: HandlerApi

    public constructor (handlerApi: HandlerApi) {
        this.handlerApi = handlerApi
    }

    public install (context: Context): void {
        const handlers: ObservableList<HandlerEntity> = new SimpleObservableList()
        const handlerForms: ObservableMap<string, any> = new SimpleObservableMap()

        context.observables().add('handlers', handlers)
        context.observables().add('handler.form.schema', handlerForms)

        context.controllers().addList([
            new MapEntry('handler@load.all', new HandlerLoadAllController(this.handlerApi, handlers)),
            new MapEntry('handler.form@reset', new HandlerFormResetController(handlers, handlerForms))
        ])

        const formService: HandlerFormService = new HandlerFormService(handlers, handlerForms)
        formService.start()

        context.channel().dispatch({ event: 'handler@load.all' })
    }
}
