import { InviteApi } from './InviteApi'
import { HttpFetch } from '../../http/HttpFetch'
import { PromiseInterceptor } from '../../http'
import { Dispatchable, Closable } from '@wildebeest/observable'

export class InviteHttpApi implements InviteApi {
    private host: string
    private interceptor: PromiseInterceptor = new PromiseInterceptor()

    public constructor (host: string) {
        this.host = host
    }

    public connect (dispatchable: Dispatchable<any>): Closable {
        return this.interceptor.connect(dispatchable)
    }

    public load (token: string): Promise<any> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/administrators/invite/' + token)
            .get()

        return this.interceptor.intercept(http)
    }

    public accept (data: any): Promise<any> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/register')
            .withJson(data)
            .post()

        return this.interceptor.intercept(http)
    }
}
