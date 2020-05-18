import { RuleValidation } from './RuleValidation'
import { SimpleRuleValidation } from './SimpleRuleValidation'

export class RuleHelper {
    public static getValidValidation (): RuleValidation {
        return new SimpleRuleValidation()
    }

    public static getErrorValidation (error: string): RuleValidation {
        return new SimpleRuleValidation(error)
    }

    public static getValidation (valid: boolean, errorMessage: string): RuleValidation {
        if (valid) {
            return this.getValidValidation()
        }
        return this.getErrorValidation(errorMessage)
    }

    public static getValidExitValidation (): RuleValidation {
        return new SimpleRuleValidation('', true)
    }
}
