import { Module, Store, ControllerProvider, Management } from '@/lib/framework'
import { AlertCreateController } from './controller/AlertCreateController'
import { AlertRemoveController } from './controller/AlertRemoveController'
import { AutohideAlertable } from './AutohideAlertable'
import { Alertable } from './Alertable'

export class AlertModule implements Module {
    private alertable: Alertable
    private store: Store

    constructor () {
        this.store = (new Store())
            .withRepository('alerts')

        this.alertable = new AutohideAlertable(
            this.store.get('alerts')
        )
    }

    public getStore (): Store {
        return this.store
    }

    public getControllerProvider (store: Store): ControllerProvider {
        return (new Management())
            .withAction('alert@create', new AlertCreateController(this.alertable))
            .withAction('alert@remove', new AlertRemoveController(store.get('alerts')))
    }

    public getAlertable (): Alertable {
        return this.alertable
    }
}
