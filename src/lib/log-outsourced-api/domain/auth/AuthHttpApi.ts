import { AuthApi } from './AuthApi'
import { HttpFetch } from '../../http/HttpFetch'
import { Channel, ProxyChannel, Closable } from '@wildebeest/observable'

export class AuthHttpApi implements AuthApi {
    private host: string
    private channel: Channel<any>

    public constructor (host: string) {
        this.host = host
        this.channel = new ProxyChannel()
    }

    public connectFn (fn: (item: any) => void): Closable {
        return this.channel.connectFn(fn)
    }

    public access (data: any): Promise<any> {
        return HttpFetch.fromUrl(this.host + '/api/v1/auth/access')
            .withJson(data)
            .post()
            .then((response: any) => {
                this.channel.dispatch(response)
                return response
            })
    }

    public refresh (token: string): Promise<any> {
        return HttpFetch.fromUrl(this.host + '/api/v1/auth/refresh')
            .withJson({
                token: token
            })
            .post()
            .then((response: any) => {
                if (response.ok) {
                    this.channel.dispatch(response)
                }
                return response
            })
    }
}
