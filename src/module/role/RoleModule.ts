import { Module } from '@/lib/framework'
import { Context } from '@/lib/framework/module/Context'
import { SimpleRepository } from '@wildebeest/repository'
import { StatefulChannel } from '@wildebeest/observable'
import { OutsourcedApi } from '@/lib/log-outsourced-api'
import { RoleLoadController } from './controller/RoleLoadController'
import { RoleCreateController } from './controller/RoleCreateController'

export class RoleModule {
    private api: OutsourcedApi

    constructor (api: OutsourcedApi) {
        this.api = api
    }

    public install (context: Context): void {
        const channel = context.channel()
        const roles = SimpleRepository.fromKeyProperty('uuid')

        context.repositories().insert('roles', roles)

        context.controllers().insert('role@load', new RoleLoadController(roles, this.api, channel))
        context.controllers().insert('role@create', new RoleCreateController(roles, this.api, channel))
    }
}
