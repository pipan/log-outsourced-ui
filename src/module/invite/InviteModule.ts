import { Module, Store, BootContext, RegisterContext } from '@/lib/framework'
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

    public boot (context: BootContext): void {
        context.withStore(this.store)
    }

    public register (context: RegisterContext, store: Store): void {
        const repo = store.get('invites')
        context.withController(
                'invite@load',
                new InviteLoadController(repo, this.alertable)
            )
            .withController(
                'invite@accept',
                new InviteAcceptController(repo, this.connectionService, this.alertable)
            )
    }
}
