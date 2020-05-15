import { Channel } from '../broadcast/Channel'

export interface Framework {
    process (event: string, data?: any): void;
    getChannel (): Channel;
    getObservable (name: string): any;
}
