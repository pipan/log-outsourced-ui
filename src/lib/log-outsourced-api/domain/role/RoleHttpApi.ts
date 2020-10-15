import { RoleApi } from './RoleApi'
import { HttpFetch, PromiseInterceptor } from '../../http'
import { AuthHttp } from '../auth/AuthHttp'
import { Dispatchable, Closable } from '@wildebeest/observable'

export class RoleHttpApi implements RoleApi {
    private host: string
    private authHttp: AuthHttp
    private interceptor: PromiseInterceptor = new PromiseInterceptor()

    public constructor (host: string, authHttp: AuthHttp) {
        this.host = host
        this.authHttp = authHttp
    }

    public connect (dispatchable: Dispatchable<any>): Closable {
        return this.interceptor.connect(dispatchable)
    }

    public all (projectUuid: string): Promise<any> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/roles?project_uuid=' + projectUuid)
            .withJson()
            .withMethod('GET')

        return this.interceptor.intercept(
            this.authHttp.send(http)
        )
    }

    public create (role: any): Promise<any> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/roles')
            .withJson(role)
            .withMethod('POST')

        return this.interceptor.intercept(
            this.authHttp.send(http)
        )
    }

    public delete (role: any): Promise<any> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/roles/' + role.uuid)
            .withJson()
            .withMethod('DELETE')

        return this.interceptor.intercept(
            this.authHttp.send(http)
        )
    }
}
