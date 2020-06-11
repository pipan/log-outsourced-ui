export class SuccessfulStatusFilter {
    private statusMap: Map<string, string>

    public constructor () {
        this.statusMap = new Map()

        this.statusMap.set('3xx', 'Server responded with redirect')
        this.statusMap.set('4xx', 'Something is wrong with request data')
        this.statusMap.set('5xx', 'Something is wrong with the server')

        this.statusMap.set('404', '404 Not found')
        this.statusMap.set('422', '422 Validation error')
    }

    public filter (response: Response): Response | PromiseLike<Response> {
        if (!response.ok) {
            let key: string = response.status.toString()
            if (this.statusMap.has(key)) {
                throw new Error(this.statusMap.get(key))
            }
            key = Math.floor(response.status / 100).toString() + 'xx'
            if (this.statusMap.has(key)) {
                throw new Error(this.statusMap.get(key))
            }
            throw new Error('Unknown error')
        }
        return response.json()
    }
}
