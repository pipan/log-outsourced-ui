import { Channel } from './Channel'

export interface Broadcast {
    channel(name: string): Channel;
}
