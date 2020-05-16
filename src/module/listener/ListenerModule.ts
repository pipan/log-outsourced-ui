import { Module } from '@/lib/framework'
import { Context } from '@/lib/framework/module/Context'
import { ObservableProperty, SimpleObservableProperty, MapEntry } from '@wildebeest/observe-changes'
import { ListenerCreateOpenController } from './controller/ListenerCreateOpenController'
import { ListenerCreateCloseController } from './controller/ListenerCreateCloseController'
import { ListenerCreateResetController } from './controller/ListenerCreateResetController'

export class ListenerModule implements Module {
    public install (context: Context): void {
        const createProperty: ObservableProperty<any> = new SimpleObservableProperty()

        context.observables().add('listener.create', createProperty)

        context.controllers().addList([
            new MapEntry('listener.create@open', new ListenerCreateOpenController(context.channel())),
            new MapEntry('listener.create@close', new ListenerCreateCloseController(context.channel(), context.observables().get('project.active'))),
            new MapEntry('listener.create@reset', new ListenerCreateResetController(createProperty))
        ])

        context.channel().dispatch({ event: 'listener.create@reset' })
    }
}
