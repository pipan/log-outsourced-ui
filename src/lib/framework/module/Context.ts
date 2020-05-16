import { Controller } from '../controller/Controller'
import { ObservableMap } from '@wildebeest/observe-changes'
import { Channel } from '@/lib/broadcast/Channel'

export interface Context {
    controllers (): ObservableMap<string, Controller>
    observables (): ObservableMap<string, any>
    channel(): Channel
}