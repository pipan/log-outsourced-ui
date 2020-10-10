import { AuthApi } from './AuthApi'
import { Http } from '../../http/Http'

export class RefreshHttp {
    private refreshToken: string
    private authApi: AuthApi

    constructor (authApi: AuthApi, refreshToken: string) {
        this.refreshToken = refreshToken
        this.authApi = authApi
    }

    public send (httpAction: Http): Promise<any> {
        return this.authApi.refresh(this.refreshToken)
            .then((response: any) => {
                return httpAction.withBearer(response.body.access)
                    .send()
            })
    }
}
