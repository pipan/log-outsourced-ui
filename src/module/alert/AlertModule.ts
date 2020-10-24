import { Module, Store, BootContext, RegisterContext } from '@/lib/framework'
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
            this.store.get('alerts'),
            8000
        )
    }

    public boot (context: BootContext): void {
        context.withStore(this.store)
    }

    public register (context: RegisterContext, store: Store): void {
        context.withController(
                'alert@create',
                new AlertCreateController(this.alertable)
            )
            .withController(
                'alert@remove',
                new AlertRemoveController(store.get('alerts'))
            )
    }

    public getAlertable (): Alertable {
        return this.alertable
    }
}
