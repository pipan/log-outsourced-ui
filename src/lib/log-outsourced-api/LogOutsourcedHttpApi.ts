import { LogOutsourcedApi } from './LogOutsourcedApi'
import { ProjectApi } from './domain/project/ProjectApi'
import { ProjectHttpApi } from './domain/project/ProjectHttpApi'
import { HandlerApi } from './domain/handler/HandlerApi'
import { HandlerHttpApi } from './domain/handler/HandlerHttpApi'
import { ListenerApi } from './domain/listener/ListnerApi'
import { ListenerHttpApi } from './domain/listener/ListenerHttpApi'

export class LogOutsourcedHttpApi implements LogOutsourcedApi {
    private projectsApi: ProjectApi
    private handlersApi: HandlerApi
    private listenersApi: ListenerApi

    public constructor (host: string) {
        this.projectsApi = new ProjectHttpApi(host)
        this.handlersApi = new HandlerHttpApi(host)
        this.listenersApi = new ListenerHttpApi(host)
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
}
