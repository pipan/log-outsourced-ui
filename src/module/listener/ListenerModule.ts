import { Module, PropertyEntity } from '@/lib/framework'
import { Context } from '@/lib/framework/module/Context'
import { ListenerCreateResetController } from './controller/ListenerCreateResetController'
import { ListenerCreateController } from './controller/ListenerCreateController'
import { ListenerApi, ListenerEntity } from '@/lib/log-outsourced-api'
import { ListenerSetAllController } from './controller/ListenerSetAllController'
import { ListenerDeleteController } from './controller/ListenerDeleteController'
import { ListenerOpenController } from './controller/ListenerOpenController'
import { ListenerCloseController } from './controller/ListenerCloseController'
import { EditListenerService } from './service/EditListenerService'
import { ListenerUpdateController } from './controller/ListenerUpdateController'
import { ListenerActiveUuidService } from './service/ListenerActiveUuidService'
import { Channel } from '@wildebeest/observable'
import { Repository, SimpleRepository } from '@wildebeest/repository'
import { ListenerTestController } from './controller/ListenerTestController'
import { LogApi } from '@/lib/log-outsourced-api/domain/log/LogApi'

export class ListenerModule implements Module {
    private listenerApi: ListenerApi
    private logApi: LogApi

    public constructor (listenerApi: ListenerApi, logApi: LogApi) {
        this.listenerApi = listenerApi
        this.logApi = logApi
    }

    public install (context: Context): void {
        const channel: Channel<any> = context.channel()
        const listeners: Repository<ListenerEntity> = new SimpleRepository()

        context.repositories().insert('listeners', listeners)

        const properties: Repository<PropertyEntity> = context.repositories().get('properties')!
        properties.insert(new PropertyEntity('listener.create', undefined))
        properties.insert(new PropertyEntity('listener.edit', undefined))
        properties.insert(new PropertyEntity('listener.active', undefined))
        properties.insert(new PropertyEntity('listener.active.uuid', ''))

        context.controllers().insert('listener@set.all', new ListenerSetAllController(listeners))
        context.controllers().insert('listener.create@reset', new ListenerCreateResetController(properties))
        context.controllers().insert('listener@create', new ListenerCreateController(listeners, this.listenerApi, channel))
        context.controllers().insert('listener@delete', new ListenerDeleteController(listeners, this.listenerApi, channel))
        context.controllers().insert('listener@update', new ListenerUpdateController(listeners, this.listenerApi, channel))

        context.controllers().insert('listener@open', new ListenerOpenController(properties))
        context.controllers().insert('listener@close', new ListenerCloseController(properties))

        context.controllers().insert('listener@test', new ListenerTestController(this.logApi, channel))

        const editListenerService: EditListenerService = new EditListenerService(properties)
        editListenerService.start()

        const activeUuidService: ListenerActiveUuidService = new ListenerActiveUuidService(listeners, properties)
        activeUuidService.start()

        context.channel().dispatch({ event: 'listener.create@reset' })
    }
}
