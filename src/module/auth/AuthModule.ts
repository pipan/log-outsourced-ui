import { Module } from '@/lib/framework'
import { Context } from '@/lib/framework/module/Context'
import { AuthAccessController } from './controller/AuthAccessController'

export class AuthModule implements Module {
    public install (context: Context): void {
        context.controllers().insert('auth@access', new AuthAccessController())
    }
}
