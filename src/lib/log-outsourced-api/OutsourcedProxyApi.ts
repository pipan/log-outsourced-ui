import { OutsourcedApi } from './OutsourcedApi'
import { AdministratorApi } from './domain/administrator/AdministratorApi'
import { AuthApi } from './domain/auth/AuthApi'
import { HandlerApi } from './domain/handler/HandlerApi'
import { InviteApi } from './domain/invite/InviteApi'
import { ListenerApi } from './domain/listener/ListnerApi'
import { LogApi } from './domain/log/LogApi'
import { ProjectApi } from './domain/project/ProjectApi'
import { RoleApi } from './domain/role/RoleApi'
import { UserApi } from './domain/user/UserApi'

export class OutsourcedProxyApi implements OutsourcedApi {
    private api!: OutsourcedApi

    public set (api: OutsourcedApi): void {
        this.api = api
    }

    public administrators (): AdministratorApi {
        return this.api.administrators()
    }

    public auth (): AuthApi {
        return this.api.auth()
    }

    public getHost (): string {
        return this.api.getHost()
    }

    public handlers (): HandlerApi {
        return this.api.handlers()
    }

    public invite (): InviteApi {
        return this.api.invite()
    }

    public listeners (): ListenerApi {
        return this.api.listeners()
    }

    public log (): LogApi {
        return this.api.log()
    }

    public projects (): ProjectApi {
        return this.api.projects()
    }

    public roles (): RoleApi {
        return this.api.roles()
    }

    public users (): UserApi {
        return this.api.users()
    }
}
