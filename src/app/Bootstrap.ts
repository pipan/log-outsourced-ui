import { Module } from '@/lib/framework'
import { ConnectionModule } from '@/module/connection'
import { AlertModule } from '@/module/alert'
import { OutsourcedProxyApi } from '@/lib/log-outsourced-api'
import { AuthModule } from '@/module/auth'
import { ProjectModule } from '@/module/project'

export class Bootstrap {
    public static getModules (): Module[] {
        const api = new OutsourcedProxyApi()

        const alert = new AlertModule()
        const auth = new AuthModule(api)
        const connection = new ConnectionModule(alert.getAlertable(), api)
        const project = new ProjectModule(api, alert.getAlertable())

        return [alert, auth, connection, project]
    }
}
