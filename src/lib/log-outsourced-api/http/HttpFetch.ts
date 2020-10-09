import { Http } from './Http'

export class HttpFetch implements Http {
    private data: any

    constructor (data: any) {
        this.data = {
            url: data.url || '',
            method: data.method || 'GET',
            headers: data.headers || {},
            body: data.body || null
        }
    }

    public static fromUrl (url: string): Http {
        return new HttpFetch({
            url: url
        })
    }

    public withHeader (name: string, value: string): Http {
        const clone = Object.assign({}, this.data)
        clone.headers[name] = value
        return new HttpFetch(clone)
    }

    public withBody (body = null): Http {
        const clone = Object.assign({}, this.data)
        clone.body = body
        return new HttpFetch(clone)
    }

    public withJson (body = null): Http {
        return this.withHeader('Content-Type', 'Application/json')
            .withBody(body)
    }

    public withBearer (token: string): Http {
        return this.withHeader('Authorization', 'Bearer ' + token)
    }

    public withMethod (method: string): Http {
        const clone = Object.assign({}, this.data)
        clone.method = method
        return new HttpFetch(clone)
    }

    public send (): Promise<any> {
        const config: any = {
            method: this.data.method,
            headers: this.data.headers
        }
        if (this.data.body) {
            config.body = JSON.stringify(this.data.body)
        }

        return fetch(this.data.url, config)
            .then((response: any) => {
                return response.json().then((responseData: any) => {
                    return {
                        status: response.status,
                        ok: response.ok,
                        body: responseData
                    }
                })
            })
    }

    public get (): Promise<any> {
        return this.withMethod('GET')
            .send()
    }

    public post (): Promise<any> {
        return this.withMethod('POST')
        .send()
    }

    public put (): Promise<any> {
        return this.withMethod('PUT')
        .send()
    }

    public delete (): Promise<any> {
        return this.withMethod('DELETE')
            .send()
    }
}
