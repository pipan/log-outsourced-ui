import { CreateHttp } from '../../http/CreateHttp'
import { DeleteHttp, UpdateHttp, AllForProjectHttp } from '../../http'

export interface UserApi extends CreateHttp, UpdateHttp, AllForProjectHttp {}
