import { AuthApi } from './AuthApi'

export class AuthHttpApi implements AuthApi {
    private host: string

    public constructor (host: string) {
        this.host = host
    }

    public access (data: any): Promise<any> {
        return fetch(this.host + '/api/v1/auth/access', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
    }

    public refresh (token: string): Promise<any> {
        return fetch(this.host + '/api/v1/auth/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token
            })
        })
            .then(response => response.json())
    }
}
