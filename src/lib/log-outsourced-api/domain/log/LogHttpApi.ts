import { LogApi } from './LogApi'
import { InterceptableHttp, HttpFetch } from '../../http'
import { AuthHttp } from '../auth/AuthHttp'

export class LogHttpApi extends InterceptableHttp implements LogApi {
    private host: string
    private authHttp: AuthHttp

    public constructor (host: string, authHttp: AuthHttp) {
        super()
        this.host = host
        this.authHttp = authHttp
    }

    public single (projectUuid: string, log: any): Promise<Response> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/logs/single?project_uuid=' + projectUuid)
            .withJson(log)
            .withMethod('POST')

        return this.send(
            this.authHttp.send(http)
        )
    }

    public batch (projectUuid: string, data: Array<any>): Promise<Response> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/logs/batch?project_uuid=' + projectUuid)
            .withJson({
                logs: data
            })
            .withMethod('POST')

        return this.send(
            this.authHttp.send(http)
        )
    }
}
