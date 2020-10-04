import { Module } from '@/lib/framework'
import { Context } from '@/lib/framework/module/Context'
import { Channel } from '@wildebeest/observable'
import { Repository } from '@wildebeest/repository'
import { Storage } from '@/lib/storage'
import { ConnectionCreateController } from './controller/ConnectionCreateController'
import { ConnectionDeleteController } from './controller/ConnectionDeleteController'
import { ConnectionUpdateController } from './controller/ConnectionUpdateController'

export class ConnectionModule implements Module {
    public install (context: Context): void {
        const channel: Channel<any> = context.channel()
        const connections: Repository<any> = Storage.createLocalStorageRepository('connections')

        context.repositories().insert('connections', connections)

        context.controllers().insert('connection@create', new ConnectionCreateController(connections, channel))
        context.controllers().insert('connection@delete', new ConnectionDeleteController(connections, channel))
        context.controllers().insert('connection@update', new ConnectionUpdateController(connections, channel))
    }
}
