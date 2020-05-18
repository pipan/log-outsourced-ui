import { Channel } from './Channel'

export interface Broadcaster {
    getChannel(name: string): Channel;
}
