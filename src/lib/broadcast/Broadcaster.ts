import { Channel } from '@wildebeest/observable'

export interface Broadcaster<T> {
    getChannel(name: string): Channel<T>;
    broadcast(name: string, event: T): void;
}
