import { AlertContract } from '../contract/AlertContract'

export class SimpleAlert implements AlertContract {
    protected id: string
    protected message: string
    protected type: string

    public constructor (id: string, message: string, type = '') {
        this.id = id
        this.message = message
        this.type = type
    }

    public getMessage (): string {
        return this.message
    }

    public getType (): string {
        return this.type
    }

    public identify (): string {
        return this.id
    }
}
