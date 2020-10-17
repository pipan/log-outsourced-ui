import { AdministratorApi } from './AdministratorApi'
import { HttpFetch, InterceptableHttp } from '../../http'
import { AuthHttp } from '../auth/AuthHttp'

export class AdministratorHttpApi extends InterceptableHttp implements AdministratorApi {
    private host: string
    private authHttp: AuthHttp

    constructor (host: string, authHttp: AuthHttp) {
        super()
        this.host = host
        this.authHttp = authHttp
    }

    public all (): Promise<any> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/administrators')
            .withJson()
            .withMethod('GET')

        return this.send(
            this.authHttp.send(http)
        )
    }

    public invite (admin: any): Promise<any> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/administrators/invite')
            .withJson(admin)
            .withMethod('POST')

        return this.send(
            this.authHttp.send(http)
        )
    }

    public delete (admin: any): Promise<any> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/administrators/' + admin.uuid)
            .withJson()
            .withMethod('DELETE')

        return this.send(
            this.authHttp.send(http)
        )
    }
}
