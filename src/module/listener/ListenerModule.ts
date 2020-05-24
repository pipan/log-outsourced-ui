import { Module } from '@/lib/framework'
import { Context } from '@/lib/framework/module/Context'
import { ObservableProperty, SimpleObservableProperty, MapEntry, ObservableList, SimpleObservableList } from '@wildebeest/observe-changes'
import { ListenerCreateOpenController } from './controller/ListenerCreateOpenController'
import { ListenerCreateCloseController } from './controller/ListenerCreateCloseController'
import { ListenerCreateResetController } from './controller/ListenerCreateResetController'
import { ListenerCreateController } from './controller/ListenerCreateController'
import { ListenerApi, ListenerEntity } from '@/lib/log-outsourced-api'
import { ListenerSetAllController } from './controller/ListenerSetAllController'
import { ListenerDeleteController } from './controller/ListenerDeleteController'
import { ListenerOpenController } from './controller/ListenerOpenController'
import { ListenerCloseController } from './controller/ListenerCloseController'
import { EditListenerService } from './service/EditListenerService'
import { ListenerUpdateController } from './controller/ListenerUpdateController'
import { ListenerActiveController } from './controller/ListenerActiveController'
import { ListenerActiveUuidService } from './service/ListenerActiveUuidService'

export class ListenerModule implements Module {
    private listenerApi: ListenerApi

    public constructor (listenerApi: ListenerApi) {
        this.listenerApi = listenerApi
    }

    public install (context: Context): void {
        const createProperty: ObservableProperty<any> = new SimpleObservableProperty()
        const listeners: ObservableList<ListenerEntity> = new SimpleObservableList()
        const listenerActive: ObservableProperty<ListenerEntity> = new SimpleObservableProperty()
        const listenerActiveUuid: ObservableProperty<string> = new SimpleObservableProperty()
        const editModel: ObservableProperty<any> = new SimpleObservableProperty()

        context.observables().add('listeners', listeners)
        context.observables().add('listener.active', listenerActive)
        context.observables().add('listener.active.uuid', listenerActiveUuid)
        context.observables().add('listener.create', createProperty)
        context.observables().add('listener.edit', editModel)

        context.controllers().addList([
            new MapEntry('listener@set.all', new ListenerSetAllController(listeners)),
            new MapEntry('listener.create@open', new ListenerCreateOpenController(context.channel(), context.observables().get('project.active'), listenerActiveUuid)),
            new MapEntry('listener.create@close', new ListenerCreateCloseController(context.channel(), context.observables().get('project.active'), listenerActiveUuid)),
            new MapEntry('listener.create@reset', new ListenerCreateResetController(createProperty)),
            new MapEntry('listener@create', new ListenerCreateController(this.listenerApi, context.channel(), listeners, context.observables().get('project.active'))),
            new MapEntry('listener@delete', new ListenerDeleteController(listeners, this.listenerApi, context.channel())),
            new MapEntry('listener@open', new ListenerOpenController(listenerActiveUuid, context.channel(), context.observables().get('project.active'))),
            new MapEntry('listener@close', new ListenerCloseController(listenerActiveUuid, context.channel(), context.observables().get('project.active'))),
            new MapEntry('listener@update', new ListenerUpdateController(this.listenerApi, listenerActive, context.channel())),
            new MapEntry('listener@active', new ListenerActiveController(listenerActiveUuid))
        ])

        const editListenerService: EditListenerService = new EditListenerService(listenerActive, editModel)
        editListenerService.start()

        const activeUuidService: ListenerActiveUuidService = new ListenerActiveUuidService(listenerActive, listeners, listenerActiveUuid)
        activeUuidService.start()

        context.channel().dispatch({ event: 'listener.create@reset' })
    }
}
