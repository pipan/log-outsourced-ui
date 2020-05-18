import { Validation } from './Validation'

export class SimpleValidation implements Validation {
    private errors: Map<string, string>
    private valid: boolean

    public constructor (valid: boolean, errors: Map<string, string>) {
        this.valid = valid
        this.errors = errors
    }

    public isValid (): boolean {
        return this.valid
    }

    public getErrors (): Map<string, string> {
        return this.errors
    }
}
