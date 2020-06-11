import { ProjectApi } from './domain/project/ProjectApi'
import { HandlerApi } from './domain/handler/HandlerApi'
import { ListenerApi } from './domain/listener/ListnerApi'
import { ConfigApi } from './domain/config/ConfigApi'

export interface LogOutsourcedApi {
    projects (): ProjectApi;
    handlers (): HandlerApi;
    listeners (): ListenerApi;
    config (): ConfigApi;
}
