import { AuthApi } from './AuthApi'
import { HttpFetch } from '../../http/HttpFetch'
import { Closable, Dispatchable } from '@wildebeest/observable'
import { PromiseInterceptor } from '../../http'

export class AuthHttpApi implements AuthApi {
    private host: string
    private promiseInterceptor = new PromiseInterceptor()

    public constructor (host: string) {
        this.host = host
    }

    public connect (dispatchable: Dispatchable<any>): Closable {
        return this.promiseInterceptor.connect(dispatchable)
    }

    public connectFn (fn: (event: any) => void): Closable {
        return this.promiseInterceptor.connectFn(fn)
    }

    public access (data: any): Promise<any> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/auth/access')
            .withJson(data)
            .post()

        return this.promiseInterceptor.intercept(http)
    }

    public refresh (token: string): Promise<any> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/auth/refresh')
            .withJson({
                refresh_token: token
            })
            .post()

        return this.promiseInterceptor.intercept(http)
    }
}
