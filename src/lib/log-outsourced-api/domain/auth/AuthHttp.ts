import { Http } from '../../http/Http'
import { BearerToken } from '../../http/BearerToken'
import { RefreshHttp } from './RefreshHttp'
import { AuthHttpApi } from './AuthHttpApi'

export class AuthHttp {
    private bearerToken: BearerToken
    private authApi: AuthHttpApi

    constructor (authApi: AuthHttpApi, tokens = {}) {
        this.bearerToken = new BearerToken(tokens)
        this.authApi = authApi

        this.authApi.connectFn((event: any) => {
            if (event.type !== 'response') {
                return
            }
            const response = event.response
            this.bearerToken.set(response.body.access, response.body.refresh)
        })
    }

    private refresh (httpAction: Http): Promise<any> {
        const refreshHttp = new RefreshHttp(this.authApi, this.bearerToken.getRefresh())
        return refreshHttp.send(httpAction)
    }

    public send (httpAction: Http): Promise<any> {
        return httpAction.withBearer(this.bearerToken.getAccess())
            .send()
            .then((response: any) => {
                if (response.status === 401) {
                    return this.refresh(httpAction)
                }
                return response
            })
    }
}
