import { InviteApi } from './InviteApi'

export class InviteHttpApi implements InviteApi {
    private host: string

    public constructor (host: string) {
        this.host = host
    }

    public load (token: string): Promise<any> {
        return fetch(this.host + '/api/v1/administrators/invite/' + token)
            .then(response => response.json())
    }

    public accept (data: any): Promise<any> {
        return fetch(this.host + '/api/v1/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
    }
}
