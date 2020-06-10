import { Identifiable } from '@wildebeest/repository/dist/identify/Identifiable'

export class ProjectEntity implements Identifiable {
    protected uuid!: string
    protected name!: string

    constructor (uuid: string, name: string) {
        this.uuid = uuid
        this.name = name
    }

    public identify (): string {
        return this.uuid
    }

    public getUuid (): string {
        return this.uuid
    }

    public getName (): string {
        return this.name
    }
}
