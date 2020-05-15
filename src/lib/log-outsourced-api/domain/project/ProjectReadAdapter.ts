import { ProjectEntity } from './ProjectEntity'
import { Adapter } from '@/lib/adapter'

export class ProjectReadAdapter implements Adapter<any, ProjectEntity> {
    public adapt (item: any): ProjectEntity {
        return new ProjectEntity(item.uuid, item.name)
    }
}
