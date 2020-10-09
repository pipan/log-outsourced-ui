import { Module, PropertyEntity } from '@/lib/framework'
import { Context } from '@/lib/framework/module/Context'
import { Repository } from '@wildebeest/repository'
import { EagerObservable } from '@wildebeest/observable'

export class ApiModule implements Module {
    public install (context: Context): void {
        context.observables().insert('api', new EagerObservable())

        // const properties: Repository<PropertyEntity> = context.repositories().get('properties')!
        // properties.insert(new PropertyEntity('api', undefined))

        // const service: ApiProjectRouteService = new ApiProjectRouteService(properties, this.host)

        // service.start()
    }
}
