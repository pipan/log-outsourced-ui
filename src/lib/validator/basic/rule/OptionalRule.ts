import { Rule } from '../../Rule'
import { RuleValidation } from '../../RuleValidation'
import { RuleHelper } from '../../RuleHelper'

export class OptionalRule implements Rule {
    public validate (value: any, args: Array<any>): RuleValidation {
        const result: boolean = value === null || value === undefined || value === ''
        if (result) {
            return RuleHelper.getValidExitValidation()
        }
        return RuleHelper.getValidValidation()
    }
}
