import { Context } from './Context'
import { Controller } from '../controller/Controller'
import { ObservableMap, SimpleObservableMap } from '@wildebeest/observe-changes'
import { Channel } from '@/lib/broadcast/Channel'

export class SimpleContext implements Context {
    private controllersMap: ObservableMap<string, Controller>
    private observablesMap: ObservableMap<string, any>
    private channelValue: Channel

    public constructor () {
        this.controllersMap = new SimpleObservableMap()
        this.observablesMap = new SimpleObservableMap()
        this.channelValue = new Channel()
    }

    public controllers (): ObservableMap<string, Controller> {
        return this.controllersMap
    }

    public observables (): ObservableMap<string, any> {
        return this.observablesMap
    }

    public channel (): Channel {
        return this.channelValue
    }
}
