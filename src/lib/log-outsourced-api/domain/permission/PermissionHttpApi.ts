import { PermissionApi } from './PermissionApi'
import { HttpFetch, InterceptableHttp } from '../../http'
import { AuthHttp } from '../auth/AuthHttp'

export class PermissionHttpApi extends InterceptableHttp implements PermissionApi {
    private host: string
    private authHtp: AuthHttp

    constructor (host: string, authHttp: AuthHttp) {
        super()
        this.host = host
        this.authHtp = authHttp
    }

    public all (projectUuid: string): Promise<any> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/permissions?project_uuid=' + projectUuid)
            .withJson()
            .withMethod('GET')

        return this.send(
            this.authHtp.send(http)
        )
    }

    public create (permission: any): Promise<any> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/permissions')
            .withJson(permission)
            .withMethod('POST')

        return this.send(
            this.authHtp.send(http)
        )
    }
}
