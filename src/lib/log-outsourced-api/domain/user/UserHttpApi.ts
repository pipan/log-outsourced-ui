import { UserApi } from './UserApi'
import { AuthHttp } from '../auth/AuthHttp'
import { HttpFetch } from '../../http'

export class UserHttpApi implements UserApi {
    private host: string
    private authHttp: AuthHttp

    public constructor (host: string, authHttp: AuthHttp) {
        this.host = host
        this.authHttp = authHttp
    }

    public all (projectUuid: string): Promise<any> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/users?project_uuid=' + projectUuid)
            .withJson()
            .withMethod('GET')

        return this.authHttp.send(http)
    }

    public create (user: any): Promise<any> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/users')
            .withJson(user)
            .withMethod('POST')

        return this.authHttp.send(http)
    }

    public delete (user: any): Promise<any> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/users/' + user.uuid)
            .withJson()
            .withMethod('DELETE')

        return this.authHttp.send(http)
    }

    public update (user: any): Promise<any> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/users/' + user.uuid)
            .withJson(user)
            .withMethod('PUT')

        return this.authHttp.send(http)
    }
}
