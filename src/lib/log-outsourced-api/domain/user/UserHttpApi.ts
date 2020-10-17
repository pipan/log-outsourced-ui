import { UserApi } from './UserApi'
import { AuthHttp } from '../auth/AuthHttp'
import { HttpFetch, PromiseInterceptor } from '../../http'
import { Dispatchable, Closable } from '@wildebeest/observable'

export class UserHttpApi implements UserApi {
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
        const http = HttpFetch.fromUrl(this.host + '/api/v1/users?project_uuid=' + projectUuid)
            .withJson()
            .withMethod('GET')

        return this.interceptor.intercept(
            this.authHttp.send(http)
        )
    }

    public create (user: any): Promise<any> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/users')
            .withJson(user)
            .withMethod('POST')

        return this.interceptor.intercept(
            this.authHttp.send(http)
        )
    }

    public delete (user: any): Promise<any> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/users/' + user.uuid)
            .withJson()
            .withMethod('DELETE')

        return this.interceptor.intercept(
            this.authHttp.send(http)
        )
    }

    public update (user: any): Promise<any> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/users/' + user.uuid)
            .withJson(user)
            .withMethod('PUT')

        return this.interceptor.intercept(
            this.authHttp.send(http)
        )
    }
}
