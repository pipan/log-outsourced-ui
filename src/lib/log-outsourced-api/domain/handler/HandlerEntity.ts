import { Identifiable } from '@wildebeest/repository/dist/identify/Identifiable'

export class HandlerEntity implements Identifiable {
    protected slug: string
    protected name: string
    protected meta: any

    public constructor (slug: string, name: string, meta: any = {}) {
        this.slug = slug
        this.name = name
        this.meta = meta
    }

    public identify (): string {
        return this.slug
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
