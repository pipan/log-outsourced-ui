import { OutsourcedApi, AuthApi, HandlerApi, InviteApi, ListenerApi, ProjectApi, UserApi, RoleApi, LogApi, OutsourcedHttpApi } from '@/lib/log-outsourced-api'
import { AdministratorApi } from '@/lib/log-outsourced-api/domain/administrator/AdministratorApi'

export class InterceptOutsourcedHttpApi implements OutsourcedApi {
    private api!: OutsourcedApi

    public constructor (host: string) {
        this.api = new OutsourcedHttpApi(host)
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