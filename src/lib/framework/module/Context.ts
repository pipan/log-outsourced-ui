import { Repository, ObservableMap } from '@wildebeest/repository'
import { Channel } from '@wildebeest/observable'
import { Controller } from '../controller/Controller'

export interface Context {
    controllers (): ObservableMap<string, Controller>;
    observables (): ObservableMap<string, any>;
    repositories (): ObservableMap<string, Repository<any>>;
    channel(): Channel<any>;
}