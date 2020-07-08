import { ProjectApi } from './domain/project/ProjectApi'
import { HandlerApi } from './domain/handler/HandlerApi'
import { ListenerApi } from './domain/listener/ListnerApi'
import { ConfigApi } from './domain/config/ConfigApi'
import { LogApi } from './domain/log/LogApi'

export interface LogOutsourcedApi {
    projects (): ProjectApi;
    handlers (): HandlerApi;
    listeners (): ListenerApi;
    log (): LogApi;
    config (): ConfigApi;
}
