import { ValidationRuleProvider } from '../ValidationRuleProvider'
import { Rule } from '../Rule'
import { RequiredRule } from './rule/RequiredRule'
import { OptionalRule } from './rule/OptionalRule'

export class BasicValidatorRuleProvide implements ValidationRuleProvider {
    public register (rules: Map<string, Rule>): void {
        rules.set('required', new RequiredRule())
        rules.set('optional', new OptionalRule())
    }
}
