export class BearerToken {
    private data: any

    constructor (data = {}) {
        this.data = data
    }

    public getAccess (): string {
        return this.data.access
    }

    public getRefresh (): string {
        return this.data.refresh
    }

    public set (access: string, refresh: string): void {
        this.data = {
            access: access,
            refresh: refresh
        }
    }
}
