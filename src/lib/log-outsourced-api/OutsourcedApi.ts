import { ProjectApi } from './domain/project/ProjectApi'
import { HandlerApi } from './domain/handler/HandlerApi'
import { ListenerApi } from './domain/listener/ListnerApi'
import { LogApi } from './domain/log/LogApi'
import { InviteApi } from './domain/invite/InviteApi'
import { AuthApi } from './domain/auth/AuthApi'
import { AdministratorApi } from './domain/administrator/AdministratorApi'
import { UserApi } from './domain/user/UserApi'
import { RoleApi } from './domain/role/RoleApi'
import { PermissionApi } from './domain/permission/PermissionApi'
import { DefaultRoleApi } from './domain/settings/defaultrole/DefaultRoleApi'
import { ProjectKeyApi } from './domain/settings/projectkey/ProjectKeyApi'

export interface OutsourcedApi {
    getHost (): string;
    projects (): ProjectApi;
    handlers (): HandlerApi;
    listeners (): ListenerApi;
    log (): LogApi;
    invite (): InviteApi;
    auth (): AuthApi;
    administrators (): AdministratorApi;
    users (): UserApi;
    roles (): RoleApi;
    permissions (): PermissionApi;
    defaultRoles (): DefaultRoleApi;
    projectKeys (): ProjectKeyApi;
}
