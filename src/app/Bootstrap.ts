import { Module } from '@/lib/framework'
import { ConnectionModule } from '@/module/connection'
import { AlertModule } from '@/module/alert'
import { AuthModule } from '@/module/auth'
import { ProjectModule } from '@/module/project'
import { AdministratorModule } from '@/module/administrator'
import { InviteModule } from '@/module/invite'
import { HttpModule } from '@/module/http'
import { UserModule } from '@/module/user'
import { RoleModule } from '@/module/role'
import { AppModule } from '@/module/app'

export class Bootstrap {
    public static getModules (): Module[] {
        const http = new HttpModule()
        const alert = new AlertModule()
        const auth = new AuthModule(http.getApi())
        const connection = new ConnectionModule(alert.getAlertable())
        const project = new ProjectModule(http.getApi(), alert.getAlertable())
        const administrator = new AdministratorModule(http.getApi(), alert.getAlertable())
        const invite = new InviteModule(connection.getService(), alert.getAlertable())
        const user = new UserModule(http.getApi(), alert.getAlertable())
        const role = new RoleModule(http.getApi(), alert.getAlertable())

        const app = new AppModule(alert.getAlertable())

        // new HandlerModule(httpApi.handlers()),
        // new ListenerModule(httpApi.listeners(), httpApi.log())

        return [http, alert, auth, connection, project, administrator, invite, user, role, app]
    }
}
