import { Channel } from '@wildebeest/observable'
import { Repository } from '@wildebeest/repository'
import { Identifiable } from '@wildebeest/repository/dist/identify/Identifiable'

export interface Framework {
    process (event: string, data?: any): void;
    getChannel (): Channel<any>;
    getObservable (name: string): any;
    getRepository<T extends Identifiable> (name: string): Repository<T>;
}
