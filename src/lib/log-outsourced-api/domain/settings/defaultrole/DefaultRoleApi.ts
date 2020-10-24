import { AllForProjectHttp } from '../../../http'

export interface DefaultRoleApi extends AllForProjectHttp {
    save (projectUuid: string, roles: string[]): Promise<any[]>;
}
