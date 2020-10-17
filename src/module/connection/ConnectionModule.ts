import { Module, Store, BootContext, RegisterContext } from '@/lib/framework'
import { Storage } from '@/lib/storage'
import { ConnectionCreateController } from './controller/ConnectionCreateController'
import { ConnectionDeleteController } from './controller/ConnectionDeleteController'
import { ConnectionUpdateController } from './controller/ConnectionUpdateController'
import { Alertable } from '../alert'
import { ConnectionService } from './ConnectionService'

export class ConnectionModule implements Module {
    private alertable: Alertable
    private store: Store
    private service: ConnectionService

    constructor (alertable: Alertable) {
        this.alertable = alertable
        this.store = (new Store())
            .withItem('connections', Storage.createLocalStorageRepository('connections'))

        this.service = new ConnectionService(this.store.get('connections'))
    }

    public boot (context: BootContext): void {
        context.withStore(this.store)
    }

    public register (context: RegisterContext, store: Store): void {
        const repo = store.get('connections')
        context.withController(
                'connection@create',
                new ConnectionCreateController(this.service, this.alertable)
            )
            .withController(
                'connection@delete',
                new ConnectionDeleteController(repo, this.alertable)
            )
            .withController(
                'connection@update',
                new ConnectionUpdateController(repo, this.alertable)
            )
    }

    public getService (): ConnectionService {
        return this.service
    }
}
