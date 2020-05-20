import { Adapter } from '@/lib/adapter'
import { ListenerEntity } from './ListenerEntity'

export class ListenerReadAdapter implements Adapter<any, ListenerEntity> {
    public adapt (item: any): ListenerEntity {
        return new ListenerEntity(
            item.uuid,
            item.projectId,
            item.name,
            item.rules,
            item.handlerSlug,
            item.handlerValues
        )
    }
}
