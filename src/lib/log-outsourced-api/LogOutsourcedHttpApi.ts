import { OutsourcedApi } from './OutsourcedApi'
import { ProjectApi } from './domain/project/ProjectApi'
import { ProjectHttpApi } from './domain/project/ProjectHttpApi'
import { HandlerApi } from './domain/handler/HandlerApi'
import { HandlerHttpApi } from './domain/handler/HandlerHttpApi'
import { ListenerApi } from './domain/listener/ListnerApi'
import { ListenerHttpApi } from './domain/listener/ListenerHttpApi'
import { ConfigApi } from './domain/config/ConfigApi'
import { ConfigHttpApi } from './domain/config/ConfigHttpApi'
import { LogApi } from './domain/log/LogApi'
import { LogHttpApi } from './domain/log/LogHttpApi'
import { InviteApi } from './domain/invite/InviteApi'
import { InviteHttpApi } from './domain/invite/InviteHttpApi'
import { BearerToken } from './http/BearerToken'
import { AuthApi } from './domain/auth/AuthApi'
import { AuthHttpApi } from './domain/auth/AuthHttpApi'
import { AuthHttp } from './domain/auth/AuthHttp'

export class LogOutsourcedHttpApi implements OutsourcedApi {
    private host: string
    private projectsApi: ProjectApi
    private handlersApi: HandlerApi
    private listenersApi: ListenerApi
    private logApi: LogApi
    private configApi: ConfigApi
    private inviteApi: InviteApi
    private authApi: AuthHttpApi

    public constructor (host: string) {
        this.host = host
        this.authApi = new AuthHttpApi(host)
        this.projectsApi = new ProjectHttpApi(host, new AuthHttp(this.authApi))
        this.handlersApi = new HandlerHttpApi(host)
        this.listenersApi = new ListenerHttpApi(host)
        this.logApi = new LogHttpApi(host)
        this.configApi = new ConfigHttpApi()
        this.inviteApi = new InviteHttpApi(host)
    }

    public getHost (): string {
        return this.host
    }

    public projects (): ProjectApi {
        return this.projectsApi
    }

    public handlers (): HandlerApi {
        return this.handlersApi
    }

    public listeners (): ListenerApi {
        return this.listenersApi
    }

    public log (): LogApi {
        return this.logApi
    }

    public config (): ConfigApi {
        return this.configApi
    }

    public invite (): InviteApi {
        return this.inviteApi
    }

    public auth (): AuthApi {
        return this.authApi
    }
}
