import { Module, Store, ControllerProvider, Management } from '@/lib/framework'
import { Storage } from '@/lib/storage'
import { ConnectionCreateController } from './controller/ConnectionCreateController'
import { ConnectionDeleteController } from './controller/ConnectionDeleteController'
import { ConnectionUpdateController } from './controller/ConnectionUpdateController'
import { ConnectionOpenController } from './controller/ConnectionOpenController'
import { OutsourcedProxyApi } from '@/lib/log-outsourced-api'
import { Alertable } from '../alert'
import { ConnectionService } from './ConnectionService'

export class ConnectionModule implements Module {
    private api: OutsourcedProxyApi
    private alertable: Alertable
    private store: Store
    private service: ConnectionService

    constructor (alertable: Alertable, api: OutsourcedProxyApi) {
        this.api = api
        this.alertable = alertable
        this.store = (new Store())
            .withItem('connections', Storage.createLocalStorageRepository('connections'))

        this.service = new ConnectionService(this.store.get('connections'))
    }

    public getStore (): Store {
        return this.store
    }

    public getControllerProvider (store: Store): ControllerProvider {
        const repo = store.get('connections')
        const authTokens = store.get('authTokens')
        return (new Management())
            .withAction(
                'connection@create',
                new ConnectionCreateController(this.service, this.alertable)
            )
            .withAction(
                'connection@delete',
                new ConnectionDeleteController(repo, this.alertable)
            )
            .withAction(
                'connection@update',
                new ConnectionUpdateController(repo, this.alertable)
            )
            .withAction(
                'connection@open',
                new ConnectionOpenController(repo, this.api, authTokens)
            )
    }

    public getService (): ConnectionService {
        return this.service
    }
}
