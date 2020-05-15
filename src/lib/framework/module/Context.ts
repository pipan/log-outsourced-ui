import { Controller } from '../controller/Controller'
import { ObservableMap } from '@wildebeest/observe-changes'

export interface Context {
    controllers (): ObservableMap<string, Controller>
    observables (): ObservableMap<string, any>
}