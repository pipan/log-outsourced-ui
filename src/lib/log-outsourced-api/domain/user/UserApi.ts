import { CreateHttp } from '../../http/CreateHttp';

export interface UserApi extends CreateHttp {
    all (projectUuid: string): Promise<any>;
    delete (user: any): Promise<Response>;
    update (user: any): Promise<any>;
}
