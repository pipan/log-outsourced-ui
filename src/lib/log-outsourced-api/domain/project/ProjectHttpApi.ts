import { ProjectApi } from './ProjectApi'
import { HttpFetch } from '../../http/HttpFetch'
import { AuthHttp } from '../auth/AuthHttp'
import { PromiseInterceptor } from '../../http'
import { Dispatchable, Closable } from '@wildebeest/observable'

export class ProjectHttpApi implements ProjectApi {
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

    public all (): Promise<any> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/projects')
            .withJson()
            .withMethod('GET')

        return this.interceptor.intercept(
            this.authHttp.send(http)
        )
    }

    public get (uuid: string): Promise<any> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/projects/' + uuid)
            .withJson()
            .withMethod('GET')

        return this.interceptor.intercept(
            this.authHttp.send(http)
        )
    }

    public delete (project: any): Promise<Response> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/projects/' + project.uuid)
            .withJson()
            .withMethod('DELETE')

        return this.interceptor.intercept(
            this.authHttp.send(http)
        )
    }

    public create (project: any): Promise<any> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/projects')
            .withJson(project)
            .withMethod('POST')

        return this.interceptor.intercept(
            this.authHttp.send(http)
        )
    }

    public update (project: any): Promise<any> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/projects/' + project.uuid)
            .withJson({
                name: project.name
            })
            .withMethod('PUT')

        return this.interceptor.intercept(
            this.authHttp.send(http)
        )
    }

    public generate (uuid: string): Promise<any> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/projects/' + uuid + '/generate')
            .withJson()
            .withMethod('PUT')

        return this.interceptor.intercept(
            this.authHttp.send(http)
        )
    }
}
