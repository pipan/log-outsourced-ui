import { LogOutsourcedApi } from './LogOutsourcedApi'
import { ProjectApi } from './domain/project/ProjectApi'
import { ProjectHttpApi } from './domain/project/ProjectHttpApi'

export class LogOutsourcedHttpApi implements LogOutsourcedApi {
    private host: string
    private projectsApi: ProjectApi

    public constructor (host: string) {
        this.host = host
        this.projectsApi = new ProjectHttpApi(host)
    }

    public projects (): ProjectApi {
        return this.projectsApi
    }
}
