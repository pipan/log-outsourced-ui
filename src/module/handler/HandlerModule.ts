import { Module } from '@/lib/framework'
import { Context } from '@/lib/framework/module/Context'
import { HandlerApi } from '@/lib/log-outsourced-api/domain/handler/HandlerApi'
import { HandlerEntity } from '@/lib/log-outsourced-api'
import { HandlerLoadAllController } from './controller/HandlerLoadAllController'
import { Repository, SimpleRepository } from '@wildebeest/repository'

export class HandlerModule implements Module {
    protected handlerApi: HandlerApi

    public constructor (handlerApi: HandlerApi) {
        this.handlerApi = handlerApi
    }

    public install (context: Context): void {
        const handlers: Repository<HandlerEntity> = new SimpleRepository()

        context.repositories().insert('handlers', handlers)

        context.controllers().insert('handler@load.all', new HandlerLoadAllController(this.handlerApi, handlers))

        context.channel().dispatch({ event: 'handler@load.all' })
    }
}
