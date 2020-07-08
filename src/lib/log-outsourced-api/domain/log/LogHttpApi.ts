import { LogApi } from './LogApi'

export class LogHttpApi implements LogApi {
    private host: string

    public constructor (host: string) {
        this.host = host
    }

    public single (project: string, log: any): Promise<Response> {
        return fetch(this.host + '/logs/' + project, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(log)
        })
    }

    public batch (project: string, data: Array<any>): Promise<Response> {
        return fetch(this.host + '/logs/' + project + '/batch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
}
