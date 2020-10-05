import { Controller } from '@/lib/framework'
import { AuthHttpApi } from '@/lib/log-outsourced-api'

export class AuthAccessController implements Controller {
    public action (data?: any): void {
        const host = data.host
        const body = data.body

        const authApi = new AuthHttpApi(host)

        authApi.access(body).then((response: any) => {
            console.log('auth access', response)
        }).catch((err: any) => {
            console.log('auth error', err)
        })
    }
}
