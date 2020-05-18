import { ValidatorBuilder } from './ValidatorBuilder'
import { Validator } from './Validator'
import { ValidationRuleProvider } from './ValidationRuleProvider'
import { Rule } from './Rule'
import { SimpleValidator } from './SimpleValidator'

export class ExtendableValidatorBuilder implements ValidatorBuilder {
    private rules: Map<string, Rule>

    public constructor () {
        this.rules = new Map()
    }

    public extend (provider: ValidationRuleProvider): void {
        provider.register(this.rules)
    }

    public build (dataRules: { [key: string]: Array<string> }): Validator {
        return new SimpleValidator(this.rules, dataRules)
    }
}
