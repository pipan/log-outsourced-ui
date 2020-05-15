import { ProjectEntity } from './ProjectEntity'

export interface ProjectApi {
    all (): Promise<Array<ProjectEntity>>;
}
