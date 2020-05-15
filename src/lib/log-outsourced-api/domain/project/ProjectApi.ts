import { ProjectEntity } from './ProjectEntity'

export interface ProjectApi {
    all (): Promise<Array<ProjectEntity>>;
    view ($projectUuid: string): Promise<ProjectEntity>;
    create (project: ProjectEntity): Promise<ProjectEntity>;
    delete (project: ProjectEntity): Promise<void>;
}
