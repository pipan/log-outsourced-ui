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

export class ListenerModule implements Module {
    private listenerApi: ListenerApi

    public constructor (listenerApi: ListenerApi) {
        this.listenerApi = listenerApi
    }

    public install (context: Context): void {
        const createProperty: ObservableProperty<any> = new SimpleObservableProperty()
        const listeners: ObservableList<ListenerEntity> = new SimpleObservableList()
        const listenerActive: ObservableProperty<ListenerEntity> = new SimpleObservableProperty()

        context.observables().add('listeners', listeners)
        context.observables().add('listener.active', listenerActive)
        context.observables().add('listener.create', createProperty)

        context.controllers().addList([
            new MapEntry('listener@set.all', new ListenerSetAllController(listeners)),
            new MapEntry('listener.create@open', new ListenerCreateOpenController(context.channel())),
            new MapEntry('listener.create@close', new ListenerCreateCloseController(context.channel(), context.observables().get('project.active'))),
            new MapEntry('listener.create@reset', new ListenerCreateResetController(createProperty, context.observables().get('handlers'), context.channel())),
            new MapEntry('listener@create', new ListenerCreateController(this.listenerApi, context.channel(), listeners, context.observables().get('project.active'))),
            new MapEntry('listener@delete', new ListenerDeleteController(listeners, this.listenerApi, context.channel()))
        ])

        context.channel().dispatch({ event: 'listener.create@reset' })
    }
}
