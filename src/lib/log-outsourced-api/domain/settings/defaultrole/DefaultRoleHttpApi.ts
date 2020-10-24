import { DefaultRoleApi } from './DefaultRoleApi'
import { AuthHttp } from '../../auth/AuthHttp'
import { InterceptableHttp, HttpFetch } from '@/lib/log-outsourced-api/http'

export class DefaultRoleHttpApi extends InterceptableHttp implements DefaultRoleApi {
    private authHttp: AuthHttp
    private host: string

    constructor (host: string, authHttp: AuthHttp) {
        super()
        this.host = host
        this.authHttp = authHttp
    }

    public all (projectUuid: string): Promise<any[]> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/settings/defaultroles?project_uuid=' + projectUuid)
            .withJson()
            .withMethod('GET')

        return this.send(
            this.authHttp.send(http)
        )
    }

    public save (projectUuid: string, roles: string[]): Promise<any[]> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/settings/defaultroles')
            .withJson({
                project_uuid: projectUuid,
                roles: roles
            })
            .withMethod('POST')

        return this.send(
            this.authHttp.send(http)
        )
    }
}
