import { CreateHttp, UpdateHttp, DeleteHttp, AllForProjectHttp } from '../../http'

export interface ListenerApi extends CreateHttp, UpdateHttp, DeleteHttp, AllForProjectHttp {}
