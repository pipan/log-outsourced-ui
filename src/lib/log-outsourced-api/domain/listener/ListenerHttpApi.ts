import { ListenerApi } from './ListnerApi'
import { InterceptableHttp, HttpFetch } from '../../http'
import { AuthHttp } from '../auth/AuthHttp'

export class ListenerHttpApi extends InterceptableHttp implements ListenerApi {
    private host: string
    private authHttp: AuthHttp

    public constructor (host: string, authHttp: AuthHttp) {
        super()
        this.host = host
        this.authHttp = authHttp
    }

    public all (projectUuid: string): Promise<any[]> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/listeners?project_uuid=' + projectUuid)
            .withJson()
            .withMethod('GET')

        return this.send(
            this.authHttp.send(http)
        )
    }

    public create (listener: any): Promise<any> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/listeners')
            .withJson(listener)
            .withMethod('POST')

        return this.send(
            this.authHttp.send(http)
        )
    }

    public update (listener: any): Promise<any> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/listeners/' + listener.uuid)
            .withJson(listener)
            .withMethod('PUT')

        return this.send(
            this.authHttp.send(http)
        )
    }

    public delete (listener: any): Promise<any> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/listeners/' + listener.uuid)
            .withJson()
            .withMethod('DELETE')

        return this.send(
            this.authHttp.send(http)
        )
    }
}
