import { AlertContract } from '../contract/AlertContract'

export class SimpleAlert implements AlertContract {
    protected message: string
    protected type: string

    public constructor (message: string, type = '') {
        this.message = message
        this.type = type
    }

    public getMessage (): string {
        return this.message
    }

    public getType (): string {
        return this.type
    }
}
