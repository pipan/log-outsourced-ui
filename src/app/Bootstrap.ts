import { Module } from '@/lib/framework'
import { ConnectionModule } from '@/module/connection'
import { AlertModule } from '@/module/alert'
import { AuthModule } from '@/module/auth'
import { ProjectModule } from '@/module/project'
import { AdministratorModule } from '@/module/administrator'
import { InviteModule } from '@/module/invite'
import { HttpModule } from '@/module/http'

export class Bootstrap {
    public static getModules (): Module[] {
        const http = new HttpModule()
        const alert = new AlertModule()
        const auth = new AuthModule(http.getApi())
        const connection = new ConnectionModule(alert.getAlertable())
        const project = new ProjectModule(http.getApi(), alert.getAlertable())
        const administrator = new AdministratorModule(http.getApi(), alert.getAlertable())
        const invite = new InviteModule(connection.getService(), alert.getAlertable())

        return [http, alert, auth, connection, project, administrator, invite]
    }
}
