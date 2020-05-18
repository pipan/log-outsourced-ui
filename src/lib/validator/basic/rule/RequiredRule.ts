import { Rule } from '../../Rule'
import { RuleValidation } from '../../RuleValidation'
import { RuleHelper } from '../../RuleHelper'

export class RequiredRule implements Rule {
    private error = 'Field is required'

    public validate (value: any, args: Array<any>): RuleValidation {
        const result: boolean = value !== null && value !== undefined && value !== ''
        return RuleHelper.getValidation(result, this.error)
    }
}
