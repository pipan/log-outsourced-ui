import { DeleteHttp } from '../../http'

export interface AdministratorApi extends DeleteHttp {
    all (): Promise<any>;
    invite (admin: any): Promise<any>;
}
