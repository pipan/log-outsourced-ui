import { Module, BootContext, RegisterContext, Store } from '@/lib/framework'
import { HttpErrorController } from './controller/HttpErrorController'
import { Alertable } from '../alert'
import { UnauthorizedController } from './controller/UnauthorizedController'
import { OpenConnectionController } from './controller/OpenConnectionController'
import { CloseConnectionController } from './controller/CloseConnectionController'
import { ServerErrorController } from './controller/ServerErrorController'

export class AppModule implements Module {
    private alertable: Alertable
    private store: Store

    constructor (alertable: Alertable) {
        this.alertable = alertable
        this.store = (new Store())
            .withObservable('error', null)
    }

    public boot (context: BootContext): void {
        context.withStore(this.store)
    }

    public register (context: RegisterContext, store: Store): void {
        const error = store.get('error')
        const tokens = store.get('authTokens')
        const connections = store.get('connections')

        context.withController(
                'http@error',
                new HttpErrorController(error)
            )
            .withController(
                'http@401',
                new UnauthorizedController(error)
            )
            .withController(
                'http@500',
                new ServerErrorController(this.alertable)
            )
            .withController(
                'connection@open',
                new OpenConnectionController(error, connections, tokens)
            )
            .withController(
                'connection@close',
                new CloseConnectionController(error)
            )
    }
}
