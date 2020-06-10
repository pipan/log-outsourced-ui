import { Identifiable } from '@wildebeest/repository/dist/identify/Identifiable'

export class PropertyEntity implements Identifiable {
    protected key: string
    protected value: any

    public constructor (key: string, value: any) {
        this.key = key
        this.value = value
    }

    public identify (): string {
        return this.key
    }

    public get (): any {
        return this.value
    }
}
