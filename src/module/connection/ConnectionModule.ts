import { Module } from '@/lib/framework'
import { Context } from '@/lib/framework/module/Context'
import { Channel, EagerObservable, StatefulChannel } from '@wildebeest/observable'
import { Storage } from '@/lib/storage'
import { ConnectionCreateController } from './controller/ConnectionCreateController'
import { ConnectionDeleteController } from './controller/ConnectionDeleteController'
import { ConnectionUpdateController } from './controller/ConnectionUpdateController'
import { ConnectionOpenController } from './controller/ConnectionOpenController'
import { ConnectionCloseController } from './controller/ConnectionCloseController'
import { OutsourcedApi } from '@/lib/log-outsourced-api'
import { UnauthorizedController } from '../auth/controller/UnauthorizedController'
import { ConnectionErrorController } from './controller/ConnectionErrorController'

export class ConnectionModule implements Module {
    private api: StatefulChannel<OutsourcedApi>

    constructor (api: StatefulChannel<OutsourcedApi>) {
        this.api = api
    }

    public install (context: Context): void {
        const channel: Channel<any> = context.channel()
        const connections = Storage.createLocalStorageRepository('connections')
        const activeConnection = new EagerObservable()
        const authTokens = context.repositories().get('authTokens')

        context.repositories().insert('connections', connections)
        context.observables().insert('connection', activeConnection)

        context.controllers().insert('connection@create', new ConnectionCreateController(connections, channel))
        context.controllers().insert('connection@delete', new ConnectionDeleteController(connections, channel))
        context.controllers().insert('connection@update', new ConnectionUpdateController(connections, channel))
        context.controllers().insert('connection@open', new ConnectionOpenController(activeConnection, connections, this.api, authTokens))
        context.controllers().insert('connection@close', new ConnectionCloseController(activeConnection))

        context.controllers().insert('connection@error', new ConnectionErrorController(activeConnection))
    }
}
