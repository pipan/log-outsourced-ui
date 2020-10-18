import { Module, BootContext, RegisterContext, Store } from '@/lib/framework'
import { ListenerCreateResetController } from './controller/ListenerCreateResetController'
import { OutsourcedApi } from '@/lib/log-outsourced-api'
import { ListenerOpenController } from './controller/ListenerOpenController'
import { ListenerCloseController } from './controller/ListenerCloseController'
import { Channel } from '@wildebeest/observable'
import { Repository, SimpleRepository } from '@wildebeest/repository'
import { ListenerTestController } from './controller/ListenerTestController'
import { LogApi } from '@/lib/log-outsourced-api/domain/log/LogApi'
import { Alertable } from '../alert'
import { ModuleBuilder } from '../ModuleBuilder'
import { LoadForProjectController } from '../LoadForProjectController'

export class ListenerModule implements Module {
    private api: OutsourcedApi
    private alertable: Alertable
    private cudModule: Module

    public constructor (api: OutsourcedApi, alertable: Alertable) {
        this.api = api
        this.alertable = alertable
        this.cudModule = (new ModuleBuilder('listener'))
            .withCreateAction(() => api.listeners(), alertable)
            .withDeleteAction(() => api.listeners(), alertable)
            .withUpdateAction(() => api.listeners(), alertable)
            .build()
    }

    public boot (context: BootContext): void {
        this.cudModule.boot(context)
    }

    public register (context: RegisterContext, store: Store): void {
        this.cudModule.register(context, store)

        const repo = store.get('listeners')

        context.withController(
            'listener@load',
            new LoadForProjectController(repo, () => this.api.listeners())
        )
    }

    public install (): void {
        // const channel: Channel<any> = context.channel()
        // const listeners: Repository<any> = SimpleRepository.createIdentifiable()

        // context.repositories().insert('listeners', listeners)

        // const properties: Repository<PropertyEntity> = context.repositories().get('properties')!
        // properties.insert(new PropertyEntity('listener.create', undefined))
        // properties.insert(new PropertyEntity('listener.edit', undefined))
        // properties.insert(new PropertyEntity('listener.active', undefined))
        // properties.insert(new PropertyEntity('listener.active.uuid', ''))

        // context.controllers().insert('listener@set.all', new ListenerSetAllController(listeners))
        // context.controllers().insert('listener.create@reset', new ListenerCreateResetController(properties))
        // context.controllers().insert('listener@create', new ListenerCreateController(listeners, this.listenerApi, channel))
        // context.controllers().insert('listener@delete', new ListenerDeleteController(listeners, this.listenerApi, channel))
        // context.controllers().insert('listener@update', new ListenerUpdateController(listeners, this.listenerApi, channel))

        // context.controllers().insert('listener@open', new ListenerOpenController(properties))
        // context.controllers().insert('listener@close', new ListenerCloseController(properties))

        // context.controllers().insert('listener@test', new ListenerTestController(this.logApi, channel))

        // const editListenerService: EditListenerService = new EditListenerService(properties)
        // editListenerService.start()

        // const activeUuidService: ListenerActiveUuidService = new ListenerActiveUuidService(listeners, properties)
        // activeUuidService.start()

        // context.channel().dispatch({ event: 'listener.create@reset' })
    }
}
