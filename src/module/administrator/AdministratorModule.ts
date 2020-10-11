import { Module } from '@/lib/framework'
import { Context } from '@/lib/framework/module/Context'
import { Channel, StatefulChannel } from '@wildebeest/observable'
import { SimpleRepository } from '@wildebeest/repository'
import { InviteLoadController } from './controller/InviteLoadController'
import { InviteAcceptController } from './controller/InviteAcceptController'
import { AdministratorLoadController } from './controller/AdministratorLoadController'
import { OutsourcedApi } from '@/lib/log-outsourced-api'
import { AdministratorInviteController } from './controller/AdministratorInviteController'
import { AdministratorDeleteController } from './controller/AdministratorDeleteController'

export class AdministratorModule implements Module {
    private api: StatefulChannel<OutsourcedApi>

    public constructor (api: StatefulChannel<OutsourcedApi>) {
        this.api = api
    }

    public install (context: Context): void {
        const channel: Channel<any> = context.channel()
        const invites = SimpleRepository.fromKeyProperty('invite_token')
        const administrators = SimpleRepository.fromKeyProperty('uuid')

        context.repositories().insert('invites', invites)
        context.repositories().insert('administrators', administrators)

        context.controllers().insert('administrator@load', new AdministratorLoadController(administrators, this.api, channel))
        context.controllers().insert('administrator@invite', new AdministratorInviteController(administrators, this.api, channel))
        context.controllers().insert('administrator@delete', new AdministratorDeleteController(administrators, this.api, channel))

        context.controllers().insert('invite@load', new InviteLoadController(invites, channel))
        context.controllers().insert('invite@accept', new InviteAcceptController(invites, channel))
    }
}
