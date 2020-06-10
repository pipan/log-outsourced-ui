import { Channel, ProxyChannel } from '@wildebeest/observable'
import { Context } from './Context'
import { Controller } from '../controller/Controller'
import { Repository, ObservableMap, Observables } from '@wildebeest/repository'

export class SimpleContext implements Context {
    private controllersMap: ObservableMap<string, Controller>
    private observablesMap: ObservableMap<string, any>
    private repositoryMap: ObservableMap<string, Repository<any>>
    private channelValue: Channel<any>

    public constructor () {
        this.controllersMap = Observables.createMap()
        this.observablesMap = Observables.createMap()
        this.repositoryMap = Observables.createMap()
        this.channelValue = new ProxyChannel()
    }

    public controllers (): ObservableMap<string, Controller> {
        return this.controllersMap
    }

    public observables (): ObservableMap<string, any> {
        return this.observablesMap
    }

    public repositories (): ObservableMap<string, Repository<any>> {
        return this.repositoryMap
    }

    public channel (): Channel<any> {
        return this.channelValue
    }
}
