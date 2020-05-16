export class ProjectEntity {
    protected uuid!: string
    protected name!: string

    constructor (
        uuid: string,
        name: string
    ) {
        this.uuid = uuid
        this.name = name
    }

    public getUuid (): string {
        return this.uuid
    }

    public getName (): string {
        return this.name
    }
}
