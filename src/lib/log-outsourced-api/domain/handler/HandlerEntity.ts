export class HandlerEntity {
    protected slug: string
    protected name: string
    protected configSchema: any
    protected meta: any

    public constructor (slug: string, name: string, configSchema: any, meta: any = {}) {
        this.slug = slug
        this.name = name
        this.configSchema = configSchema
        this.meta = meta
    }

    public getSlug (): string {
        return this.slug
    }

    public getName (): string {
        return this.name
    }

    public getConfigSchema (): any {
        return this.configSchema
    }

    public getMeta (): any {
        return this.meta
    }
}
