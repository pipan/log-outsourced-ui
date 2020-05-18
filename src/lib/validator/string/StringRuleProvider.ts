import { ValidationRuleProvider } from '../ValidationRuleProvider'
import { Rule } from '../Rule'
import { MinRule } from './rule/MinRule'
import { MaxRule } from './rule/MaxRule'

export class StringRuleProvider implements ValidationRuleProvider {
    public register (rules: Map<string, Rule>): void {
        rules.set('str.min', new MinRule())
        rules.set('str.max', new MaxRule())
    }
}
