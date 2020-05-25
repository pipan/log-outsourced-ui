export class HandlerEntity {
    protected slug: string
    protected name: string
    protected meta: any

    public constructor (slug: string, name: string, meta: any = {}) {
        this.slug = slug
        this.name = name
        this.meta = meta
    }

    public getSlug (): string {
        return this.slug
    }

    public getName (): string {
        return this.name
    }

    public getMeta (): any {
        return this.meta
    }
}
