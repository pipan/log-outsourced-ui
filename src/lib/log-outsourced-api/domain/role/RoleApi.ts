import { CreateHttp, DeleteHttp, AllForProjectHttp } from '../../http';

export interface RoleApi extends AllForProjectHttp, CreateHttp, DeleteHttp {}