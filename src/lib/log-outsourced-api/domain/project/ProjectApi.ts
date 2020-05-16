import { ProjectEntity } from './ProjectEntity'

export interface ProjectApi {
    all (): Promise<Array<ProjectEntity>>;
    view (uuid: string): Promise<ProjectEntity>;
    create (project: ProjectEntity): Promise<ProjectEntity>;
    delete (project: ProjectEntity): Promise<void>;
    update (prject: ProjectEntity): Promise<ProjectEntity>;
    generate (uuid: string): Promise<ProjectEntity>;
}
