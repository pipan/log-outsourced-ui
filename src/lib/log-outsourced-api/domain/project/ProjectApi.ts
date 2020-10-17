import { CreateHttp, UpdateHttp, DeleteHttp } from '../../http'

export interface ProjectApi extends CreateHttp, UpdateHttp, DeleteHttp {
    all (): Promise<any>;
    get (uuid: string): Promise<any>;
    generate (uuid: string): Promise<any>;
}
