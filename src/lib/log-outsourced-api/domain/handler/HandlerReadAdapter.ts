import { Adapter } from '@/lib/adapter'
import { HandlerEntity } from './HandlerEntity'

export class HandlerRreadAdapter implements Adapter<any, HandlerEntity> {
    public adapt (item: any): HandlerEntity {
        return new HandlerEntity(
            item.slug,
            item.name,
            item.meta
        )
    }
}
