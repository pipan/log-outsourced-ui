import { RoleApi } from './RoleApi'
import { HttpFetch } from '../../http'
import { AuthHttp } from '../auth/AuthHttp'

export class RoleHttpApi implements RoleApi {
    private host: string
    private authHttp: AuthHttp

    public constructor (host: string, authHttp: AuthHttp) {
        this.host = host
        this.authHttp = authHttp
    }

    public all (projectUuid: string): Promise<any> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/roles?project_uuid=' + projectUuid)
        .withJson()
        .withMethod('GET')

    return this.authHttp.send(http)
    }

    public create (role: any): Promise<any> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/roles')
            .withJson(role)
            .withMethod('POST')

        return this.authHttp.send(http)
    }

    public delete (role: any): Promise<any> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/roles/' + role.uuid)
            .withJson()
            .withMethod('DELETE')

        return this.authHttp.send(http)
    }
}
