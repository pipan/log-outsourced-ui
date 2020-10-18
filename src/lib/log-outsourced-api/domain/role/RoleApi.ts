import { CreateHttp, DeleteHttp, AllForProjectHttp, UpdateHttp } from '../../http'

export interface RoleApi extends AllForProjectHttp, CreateHttp, DeleteHttp, UpdateHttp {}
