import { ProjectKeyApi } from './ProjectKeyApi'
import { AuthHttp } from '../../auth/AuthHttp'
import { HttpFetch, InterceptableHttp } from '@/lib/log-outsourced-api/http'

export class ProjectKeyHttpApi extends InterceptableHttp implements ProjectKeyApi {
    private host: string
    private authHttp: AuthHttp

    constructor (host: string, authHttp: AuthHttp) {
        super()
        this.host = host
        this.authHttp = authHttp
    }

    public all (projectUuid: string): Promise<any[]> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/settings/projectkeys?project_uuid=' + projectUuid)
            .withJson()
            .withMethod('GET')

        return this.send(
            this.authHttp.send(http)
        )
    }

    public create (data: any): Promise<any> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/settings/projectkeys')
            .withJson(data)
            .withMethod('POST')

        return this.send(
            this.authHttp.send(http)
        )
    }

    public update (data: any): Promise<any> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/settings/projectkeys/' + data.key)
            .withJson(data)
            .withMethod('PUT')

        return this.send(
            this.authHttp.send(http)
        )
    }

    public delete (key: any): Promise<any> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/settings/projectkeys/' + key.key)
            .withJson()
            .withMethod('DELETE')

        return this.send(
            this.authHttp.send(http)
        )
    }
}
