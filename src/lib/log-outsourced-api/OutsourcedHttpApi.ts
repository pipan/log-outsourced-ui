import { OutsourcedApi } from './OutsourcedApi'
import { ProjectApi } from './domain/project/ProjectApi'
import { ProjectHttpApi } from './domain/project/ProjectHttpApi'
import { HandlerApi } from './domain/handler/HandlerApi'
import { HandlerHttpApi } from './domain/handler/HandlerHttpApi'
import { ListenerApi } from './domain/listener/ListnerApi'
import { ListenerHttpApi } from './domain/listener/ListenerHttpApi'
import { LogApi } from './domain/log/LogApi'
import { LogHttpApi } from './domain/log/LogHttpApi'
import { InviteApi } from './domain/invite/InviteApi'
import { InviteHttpApi } from './domain/invite/InviteHttpApi'
import { AuthHttpApi } from './domain/auth/AuthHttpApi'
import { AuthApi } from './domain/auth/AuthApi'
import { AuthHttp } from './domain/auth/AuthHttp'
import { AdministratorApi } from './domain/administrator/AdministratorApi'
import { AdministratorHttpApi } from './domain/administrator/AdministratorHttpApi'
import { UserHttpApi } from './domain/user/UserHttpApi'
import { UserApi } from './domain/user/UserApi'
import { RoleHttpApi } from './domain/role/RoleHttpApi'
import { RoleApi } from './domain/role/RoleApi'
import { Channel, ProxyChannel, Closable } from '@wildebeest/observable'
import { PermissionHttpApi } from './domain/permission/PermissionHttpApi'
import { PermissionApi } from './domain/permission/PermissionApi'
import { DefaultRoleHttpApi } from './domain/settings/defaultrole/DefaultRoleHttpApi'
import { DefaultRoleApi } from './domain/settings/defaultrole/DefaultRoleApi'
import { ProjectKeyHttpApi } from './domain/settings/projectkey/ProjectKeyHttpApi'
import { ProjectKeyApi } from './domain/settings/projectkey/ProjectKeyApi'

export class OutsourcedHttpApi implements OutsourcedApi {
    private domains: any
    private host: string
    private responseChannel: Channel<any>

    public constructor (host: string, tokens = {}) {
        this.host = host
        this.responseChannel = new ProxyChannel()

        const authApi = new AuthHttpApi(host)
        const authHttp = new AuthHttp(authApi, tokens)

        this.domains = {
            project: new ProjectHttpApi(host, authHttp),
            administrators: new AdministratorHttpApi(host, authHttp),
            users: new UserHttpApi(host, authHttp),
            permissions: new PermissionHttpApi(host, authHttp),
            roles: new RoleHttpApi(host, authHttp),
            handler: new HandlerHttpApi(host, authHttp),
            listener: new ListenerHttpApi(host, authHttp),
            log: new LogHttpApi(host, authHttp),
            invite: new InviteHttpApi(host),
            defaultRoles: new DefaultRoleHttpApi(host, authHttp),
            projectKeys: new ProjectKeyHttpApi(host, authHttp),
            auth: authApi
        }

        this.domains.project.connect(this.responseChannel)
        this.domains.administrators.connect(this.responseChannel)
        this.domains.users.connect(this.responseChannel)
        this.domains.permissions.connect(this.responseChannel)
        this.domains.roles.connect(this.responseChannel)
        this.domains.invite.connect(this.responseChannel)
        this.domains.auth.connect(this.responseChannel)
        this.domains.defaultRoles.connect(this.responseChannel)
        this.domains.projectKeys.connect(this.responseChannel)
        this.domains.log.connect(this.responseChannel)
    }

    public connectFn (fn: (data: any) => void): Closable {
        return this.responseChannel.connectFn(fn)
    }

    public getHost (): string {
        return this.host
    }

    public projects (): ProjectApi {
        return this.domains.project
    }

    public handlers (): HandlerApi {
        return this.domains.handler
    }

    public listeners (): ListenerApi {
        return this.domains.listener
    }

    public log (): LogApi {
        return this.domains.log
    }

    public invite (): InviteApi {
        return this.domains.invite
    }

    public auth (): AuthApi {
        return this.domains.auth
    }

    public administrators (): AdministratorApi {
        return this.domains.administrators
    }

    public users (): UserApi {
        return this.domains.users
    }

    public roles (): RoleApi {
        return this.domains.roles
    }

    public permissions (): PermissionApi {
        return this.domains.permissions
    }

    public defaultRoles (): DefaultRoleApi {
        return this.domains.defaultRoles
    }

    public projectKeys (): ProjectKeyApi {
        return this.domains.projectKeys
    }
}
