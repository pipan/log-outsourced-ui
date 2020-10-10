import { ProjectApi } from './domain/project/ProjectApi'
import { HandlerApi } from './domain/handler/HandlerApi'
import { ListenerApi } from './domain/listener/ListnerApi'
import { LogApi } from './domain/log/LogApi'
import { InviteApi } from './domain/invite/InviteApi'
import { AuthApi } from './domain/auth/AuthApi'

export interface OutsourcedApi {
    getHost (): string;
    projects (): ProjectApi;
    handlers (): HandlerApi;
    listeners (): ListenerApi;
    log (): LogApi;
    invite (): InviteApi;
    auth (): AuthApi;
}
