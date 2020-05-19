export class ListenerEntity {
    protected uuid: string
    protected projectUuid: string
    protected name: string
    protected rules: any
    protected handlerSlug: string
    protected handlerValues: any

    public constructor (uuid: string, projectUuid: string, name: string, rules: any, handlerSlug: string, handlerValues: any) {
        this.uuid = uuid
        this.projectUuid = projectUuid
        this.name = name
        this.rules = rules
        this.handlerSlug = handlerSlug
        this.handlerValues = handlerValues
    }

    public getUuid (): string {
        return this.uuid
    }

    public getProjecUuid (): string {
        return this.projectUuid
    }

    public getName (): string {
        return this.name
    }

    public getRules (): any {
        return this.rules
    }

    public getHandlerSlug (): string {
        return this.handlerSlug
    }

    public getHandlerValues (): any {
        return this.handlerValues
    }
}
