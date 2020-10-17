import { Module, BootContext, RegisterContext, Store } from '@/lib/framework'
import { HttpErrorController } from './controller/HttpErrorController'
import { Alertable } from '../alert'

export class AppModule implements Module {
    private alertable: Alertable

    constructor (alertable: Alertable) {
        this.alertable = alertable
    }

    public boot (context: BootContext): void {
        console.log('app boot')
    }

    public register (context: RegisterContext, store: Store): void {
        context.withController(
            'http@error',
            new HttpErrorController(this.alertable)
        )
    }
}
