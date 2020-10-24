import { AllForProjectHttp, CreateHttp, DeleteHttp, UpdateHttp } from '@/lib/log-outsourced-api/http'

export interface ProjectKeyApi extends AllForProjectHttp, CreateHttp, DeleteHttp, UpdateHttp {}
