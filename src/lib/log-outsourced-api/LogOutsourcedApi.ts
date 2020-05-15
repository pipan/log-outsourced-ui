import { ProjectApi } from './domain/project/ProjectApi'

export interface LogOutsourcedApi {
    projects (): ProjectApi;
}
