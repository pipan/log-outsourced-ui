import { Module } from '@/lib/framework'
import { Context } from '@/lib/framework/module/Context'
import { SimpleRepository } from '@wildebeest/repository'
import { OutsourcedApi } from '@/lib/log-outsourced-api'
import { UserLoadController } from './controller/UserLoadController'
import { UserCreateController } from './controller/UserCreateController'

export class UserModule {
    private api: OutsourcedApi

    constructor (api: OutsourcedApi) {
        this.api = api
    }

    public install (context: Context): void {
        const channel = context.channel()
        const users = SimpleRepository.fromKeyProperty('uuid')

        context.repositories().insert('users', users)

        context.controllers().insert('user@load', new UserLoadController(users, this.api, channel))
        context.controllers().insert('user@create', new UserCreateController(users, this.api, channel))
    }
}
