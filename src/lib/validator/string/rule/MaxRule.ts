import { Rule } from '../../Rule'
import { RuleValidation } from '../../RuleValidation'
import { RuleHelper } from '../../RuleHelper'

export class MaxRule implements Rule {
    public validate (value: string, args: Array<string>): RuleValidation {
        const maxSize: number = parseInt(args[0])
        const result: boolean = value.length <= maxSize
        const error: string = 'Field cannot be longer then ' + maxSize + ' characters'
        return RuleHelper.getValidation(result, error)
    }
}
