import { Identifiable } from '@wildebeest/repository/dist/identify/Identifiable'

export class ListenerEntity implements Identifiable {
    protected uuid: string
    protected projectUuid: string
    protected name: string
    protected rules: Array<string>
    protected handlerSlug: string
    protected handlerValues: any

    public constructor (uuid: string, projectUuid: string, name: string, rules: Array<string>, handlerSlug: string, handlerValues: any) {
        this.uuid = uuid
        this.projectUuid = projectUuid
        this.name = name
        this.rules = rules
        this.handlerSlug = handlerSlug
        this.handlerValues = handlerValues
    }

    public identify (): string {
        return this.uuid
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

    public getRules (): Array<string> {
        return this.rules
    }

    public getHandlerSlug (): string {
        return this.handlerSlug
    }

    public getHandlerValues (): any {
        return this.handlerValues
    }
}
