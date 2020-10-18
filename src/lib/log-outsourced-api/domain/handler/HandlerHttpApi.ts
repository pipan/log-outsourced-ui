import { HandlerApi } from './HandlerApi'
import { InterceptableHttp, HttpFetch } from '../../http'
import { AuthHttp } from '../auth/AuthHttp'

export class HandlerHttpApi extends InterceptableHttp implements HandlerApi {
    private host: string
    private authHttp: AuthHttp

    public constructor (host: string, authHttp: AuthHttp) {
        super()
        this.host = host
        this.authHttp = authHttp
    }

    public all (): Promise<any[]> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/handlers')
            .withJson()
            .withMethod('GET')

        return this.send(
            this.authHttp.send(http)
        )
    }

    public view (slug: string): Promise<any> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/handlers/' + slug)
            .withJson()
            .withMethod('GET')

        return this.send(
            this.authHttp.send(http)
        )
    }
}
