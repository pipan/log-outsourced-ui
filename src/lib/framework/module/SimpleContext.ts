import { Context } from './Context'
import { Controller } from '../controller/Controller'
import { ObservableMap, SimpleObservableMap } from '@wildebeest/observe-changes'

export class SimpleContext implements Context {
    private controllersMap: ObservableMap<string, Controller>
    private observablesMap: ObservableMap<string, any>

    public constructor () {
        this.controllersMap = new SimpleObservableMap()
        this.observablesMap = new SimpleObservableMap()
    }

    public controllers (): ObservableMap<string, Controller> {
        return this.controllersMap
    }

    public observables (): ObservableMap<string, any> {
        return this.observablesMap
    }
}
