import { Module } from '@/lib/framework'
import { Context } from '@/lib/framework/module/Context'
import { ObservableProperty, SimpleObservableProperty, MapEntry } from '@wildebeest/observe-changes'
import { ListenerCreateOpenController } from './controller/ListenerCreateOpenController'
import { ListenerCreateCloseController } from './controller/ListenerCreateCloseController'
import { ListenerCreateResetController } from './controller/ListenerCreateResetController'
import { ListenerCreateController } from './controller/ListenerCreateController'
import { ListenerApi } from '@/lib/log-outsourced-api'

export class ListenerModule implements Module {
    private listenerApi: ListenerApi

    public constructor (listenerApi: ListenerApi) {
        this.listenerApi = listenerApi
    }

    public install (context: Context): void {
        const createProperty: ObservableProperty<any> = new SimpleObservableProperty()

        context.observables().add('listener.create', createProperty)

        context.controllers().addList([
            new MapEntry('listener.create@open', new ListenerCreateOpenController(context.channel())),
            new MapEntry('listener.create@close', new ListenerCreateCloseController(context.channel(), context.observables().get('project.active'))),
            new MapEntry('listener.create@reset', new ListenerCreateResetController(createProperty)),
            new MapEntry('listener@create', new ListenerCreateController(this.listenerApi, context.channel()))
        ])

        context.channel().dispatch({ event: 'listener.create@reset' })
    }
}