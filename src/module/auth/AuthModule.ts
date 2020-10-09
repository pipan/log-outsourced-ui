import { Module } from '@/lib/framework'
import { Context } from '@/lib/framework/module/Context'
import { AuthAccessController } from './controller/AuthAccessController'
import { SimpleRepository } from '@wildebeest/repository'
import { StatefulChannel, EagerObservable } from '@wildebeest/observable'
import { OutsourcedApi } from '@/lib/log-outsourced-api'
import { UnauthorizedController } from './controller/UnauthorizedController'
import { ConnectionCloseController } from './controller/ConnectionCloseController'

export class AuthModule implements Module {
    private api: StatefulChannel<OutsourcedApi>

    constructor (api: StatefulChannel<OutsourcedApi>) {
        this.api = api
    }

    public install (context: Context): void {
        const authTokens = SimpleRepository.fromKeyProperty('id')
        const auth = new EagerObservable({})

        context.observables().insert('auth', auth)
        context.repositories().insert('authTokens', authTokens)

        context.controllers().insert('connection@close', new ConnectionCloseController(auth))
        context.controllers().insert('auth@access', new AuthAccessController(authTokens, this.api, auth))
        context.controllers().insert('error@401', new UnauthorizedController(auth))
    }
}
