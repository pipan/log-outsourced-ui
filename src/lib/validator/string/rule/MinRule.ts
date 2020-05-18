import { Rule } from '../../Rule'
import { RuleValidation } from '../../RuleValidation'
import { RuleHelper } from '../../RuleHelper'

export class MinRule implements Rule {
    public validate (value: string, args: Array<string>): RuleValidation {
        const minSize: number = parseInt(args[0])
        const result: boolean = value.length >= minSize
        const error: string = 'Field has to be at least ' + minSize + ' characters long'
        return RuleHelper.getValidation(result, error)
    }
}
