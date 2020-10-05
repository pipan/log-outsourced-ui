import { Module } from '@/lib/framework'
import { Context } from '@/lib/framework/module/Context'
import { Channel } from '@wildebeest/observable'
import { SimpleRepository } from '@wildebeest/repository'
import { InviteLoadController } from './controller/InviteLoadController'
import { InviteAcceptController } from './controller/InviteAcceptController'

export class AdministratorModule implements Module {
    public install (context: Context): void {
        const channel: Channel<any> = context.channel()
        const invites = SimpleRepository.fromKeyProperty('invite_token')

        context.repositories().insert('invites', invites)

        context.controllers().insert('invite@load', new InviteLoadController(invites, channel))
        context.controllers().insert('invite@accept', new InviteAcceptController(invites, channel))
    }
}
