import { Module, Store, BootContext, RegisterContext } from '@/lib/framework'
import { InviteLoadController } from './controller/InviteLoadController'
import { InviteAcceptController } from './controller/InviteAcceptController'
import { ConnectionService } from '../connection'
import { Alertable } from '../alert'
import { ApiFactory } from '../http'

export class InviteModule implements Module {
    private store: Store
    private connectionService: ConnectionService
    private apiFactory: ApiFactory

    constructor (connectionService: ConnectionService, apiFactory: ApiFactory) {
        this.connectionService = connectionService
        this.apiFactory = apiFactory
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
                new InviteLoadController(repo, this.apiFactory)
            )
            .withController(
                'invite@accept',
                new InviteAcceptController(repo, this.connectionService, this.apiFactory)
            )
    }
}
