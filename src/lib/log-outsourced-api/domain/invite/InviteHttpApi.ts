import { InviteApi } from './InviteApi'
import { HttpFetch } from '../../http/HttpFetch'

export class InviteHttpApi implements InviteApi {
    private host: string

    public constructor (host: string) {
        this.host = host
    }

    public load (token: string): Promise<any> {
        return HttpFetch.fromUrl(this.host + '/api/v1/administrators/invite/' + token)
            .get()
    }

    public accept (data: any): Promise<any> {
        return HttpFetch.fromUrl(this.host + '/api/v1/register')
            .withJson(data)
            .post()
    }
}
