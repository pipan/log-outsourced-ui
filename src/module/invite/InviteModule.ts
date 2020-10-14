import { Module, Store, ControllerProvider, Management } from '@/lib/framework'
import { InviteLoadController } from './controller/InviteLoadController'
import { InviteAcceptController } from './controller/InviteAcceptController'
import { ConnectionService } from '../connection'
import { Alertable } from '../alert'

export class InviteModule implements Module {
    private store: Store
    private connectionService: ConnectionService
    private alertable: Alertable

    constructor (connectionService: ConnectionService, alertable: Alertable) {
        this.connectionService = connectionService
        this.alertable = alertable
        this.store = (new Store())
            .withRepository('invites', 'invite_token')
    }

    public getStore (): Store {
        return this.store
    }

    public getControllerProvider (store: Store): ControllerProvider {
        const repo = store.get('invites')
        return (new Management())
            .withAction(
                'invite@load',
                new InviteLoadController(repo, this.alertable)
            )
            .withAction(
                'invite@accept',
                new InviteAcceptController(repo, this.connectionService, this.alertable)
            )
    }
}
