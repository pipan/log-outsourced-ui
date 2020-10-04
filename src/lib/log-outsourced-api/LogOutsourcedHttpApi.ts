import { LogOutsourcedApi } from './LogOutsourcedApi'
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

export class LogOutsourcedHttpApi implements LogOutsourcedApi {
    private projectsApi: ProjectApi
    private handlersApi: HandlerApi
    private listenersApi: ListenerApi
    private logApi: LogApi
    private configApi: ConfigApi
    private inviteApi: InviteApi

    public constructor (host: string) {
        this.projectsApi = new ProjectHttpApi(host)
        this.handlersApi = new HandlerHttpApi(host)
        this.listenersApi = new ListenerHttpApi(host)
        this.logApi = new LogHttpApi(host)
        this.configApi = new ConfigHttpApi()
        this.inviteApi = new InviteHttpApi(host)
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
}
