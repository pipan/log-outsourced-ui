import { RuleValidation } from './RuleValidation'

export class SimpleRuleValidation implements RuleValidation {
    private valid: boolean
    private error: string
    private exit: boolean

    public constructor (error = '', exit = false) {
        this.error = error
        this.valid = error.length === 0
        this.exit = exit
    }

    public getError (): string {
        return this.error
    }

    public isValid (): boolean {
        return this.valid
    }

    public shouldExit (): boolean {
        return this.exit
    }
}
