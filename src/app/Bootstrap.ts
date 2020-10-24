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
import { ListenerModule } from '@/module/listener'
import { HandlerModule } from '@/module/handler'
import { PermissionModule } from '@/module/permission/PermissionModule'
import { FormModule } from '@/module/form'
import { DefaultRoleModule } from '@/module/defaultrole'
import { ProjectKeyModule } from '@/module/projectkey'

export class Bootstrap {
    public static getModules (): Module[] {
        const form = new FormModule()
        const http = new HttpModule()
        const alert = new AlertModule()
        const auth = new AuthModule(http.getApi())
        const connection = new ConnectionModule(alert.getAlertable())
        const project = new ProjectModule(
            http.getApi(),
            alert.getAlertable(),
            form.getFormValidator()
        )
        const administrator = new AdministratorModule(http.getApi(), alert.getAlertable())
        const invite = new InviteModule(connection.getService(), http.getApiFactory())
        const permission = new PermissionModule(http.getApi())
        const role = new RoleModule(
            http.getApi(),
            alert.getAlertable(),
            form.getFormValidator()
        )
        const user = new UserModule(
            http.getApi(),
            alert.getAlertable(),
            form.getFormValidator()
        )
        const handler = new HandlerModule(http.getApi())
        const listener = new ListenerModule(
            http.getApi(),
            alert.getAlertable(),
            form.getFormValidator()
        )
        const defaultRole = new DefaultRoleModule(http.getApi(), alert.getAlertable())
        const projectKey = new ProjectKeyModule(
            http.getApi(),
            alert.getAlertable(),
            form.getFormValidator()
        )

        const app = new AppModule(alert.getAlertable())

        return [form, http, alert, auth, connection, project, administrator, invite, role, permission, user, handler, listener, defaultRole, projectKey, app]
    }
}
