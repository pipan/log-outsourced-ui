import { Module } from '@/lib/framework'
import { AlertCreateController } from './controller/AlertCreateController'
import { SimpleObservableList, ObservableList, MapEntry } from '@wildebeest/observe-changes'
import { AlertRemoveController } from './controller/AlertRemoveController'
import { Context } from '@/lib/framework/module/Context'
import { AlertContract } from '@/components/alert'

export class AlertModule implements Module {
    public install (context: Context): void {
        const alerts: ObservableList<AlertContract> = new SimpleObservableList()

        context.observables().add('alerts', alerts)

        context.controllers().addList([
            new MapEntry('alert@create', new AlertCreateController(alerts)),
            new MapEntry('alert@remove', new AlertRemoveController(alerts))
        ])
    }
}
