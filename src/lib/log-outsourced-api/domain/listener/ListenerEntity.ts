export class ListenerEntity {
    protected uuid: string
    protected projectId: number
    protected name: string
    protected rules: any
    protected handler: any

    public constructor (uuid: string, projectId: number, name: string, rules: any, handler: any) {
        this.uuid = uuid
        this.projectId = projectId
        this.name = name
        this.rules = rules
        this.handler = handler
    }

    public getUuid (): string {
        return this.uuid
    }

    public getProjecId (): number {
        return this.projectId
    }

    public getName (): string {
        return this.name
    }

    public getRules (): any {
        return this.rules
    }

    public getHandler (): any {
        return this.handler
    }
}
