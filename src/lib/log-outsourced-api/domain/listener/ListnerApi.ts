import { ListenerEntity } from './ListenerEntity'

export interface ListenerApi {
    create (listener: ListenerEntity): Promise<ListenerEntity>;
    update (listener: ListenerEntity): Promise<ListenerEntity>;
    delete (listener: ListenerEntity): Promise<any>;
}
