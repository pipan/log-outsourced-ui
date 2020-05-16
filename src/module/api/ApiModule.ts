import { Module } from '@/lib/framework'
import { Context } from '@/lib/framework/module/Context'
import { ObservableProperty, SimpleObservableProperty } from '@wildebeest/observe-changes'
import { ApiProjectRouteService } from './service/ApiProjectRouteService'

export class ApiModule implements Module {
    private host: string

    public constructor (host: string) {
        this.host = host
    }

    public install (context: Context): void {
        const api: ObservableProperty<any> = new SimpleObservableProperty({
            url: ''
        })

        context.observables().add('api', api)

        const service: ApiProjectRouteService = new ApiProjectRouteService(api, context.observables().get('project.active'), this.host)

        service.start()
    }
}
