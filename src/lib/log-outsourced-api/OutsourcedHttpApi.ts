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

export class OutsourcedHttpApi implements OutsourcedApi {
    private domains: any
    private host: string

    public constructor (host: string, tokens = {}) {
        this.host = host

        const authApi = new AuthHttpApi(host)
        const authHttp = new AuthHttp(authApi, tokens)

        this.domains = {
            project: new ProjectHttpApi(host, authHttp),
            handler: new HandlerHttpApi(host),
            listener: new ListenerHttpApi(host),
            log: new LogHttpApi(host),
            invite: new InviteHttpApi(host),
            auth: authApi
        }
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
}