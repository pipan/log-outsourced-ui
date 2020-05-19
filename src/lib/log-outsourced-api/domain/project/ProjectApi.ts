import { ProjectEntity } from './ProjectEntity'
import { ListenerEntity } from '../listener/ListenerEntity'

export interface ProjectApi {
    all (): Promise<Array<ProjectEntity>>;
    view (uuid: string): Promise<{project: ProjectEntity; listeners: Array<ListenerEntity>}>;
    create (project: ProjectEntity): Promise<ProjectEntity>;
    delete (project: ProjectEntity): Promise<void>;
    update (prject: ProjectEntity): Promise<ProjectEntity>;
    generate (uuid: string): Promise<ProjectEntity>;
}
