import { Module, PropertyEntity } from '@/lib/framework'
import { Context } from '@/lib/framework/module/Context'
import { ApiProjectRouteService } from './service/ApiProjectRouteService'
import { Repository } from '@wildebeest/repository'

export class ApiModule implements Module {
    private host: string

    public constructor (host: string) {
        this.host = host
    }

    public install (context: Context): void {
        const properties: Repository<PropertyEntity> = context.repositories().get('properties')!
        properties.insert(new PropertyEntity('api', undefined))

        const service: ApiProjectRouteService = new ApiProjectRouteService(properties, this.host)

        service.start()
    }
}
