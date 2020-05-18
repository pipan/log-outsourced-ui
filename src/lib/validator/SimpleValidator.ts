import { Validator } from './Validator'
import { Validation } from './Validation'
import { Rule } from './Rule'
import { SimpleValidation } from './SimpleValidation'
import { RuleName } from './RuleName'
import { ValidatorHelper } from './ValidatorHelper'
import { RuleValidation } from './RuleValidation'

export class SimpleValidator implements Validator {
    private rules: Map<string, Rule>
    private dataRules: { [key: string]: Array<any> }

    public constructor (rules: Map<string, Rule>, dataRules: { [key: string]: Array<any> }) {
        this.rules = rules
        this.dataRules = dataRules
    }

    public validate (data: any): Validation {
        const errors: Map<string, string> = new Map()

        for (const valueName in this.dataRules) {
            const error: string = this.validateValue(data[valueName], this.dataRules[valueName])

            if (error.length > 0) {
                errors.set(valueName, error)
            }
        }

        return new SimpleValidation(errors.size === 0, errors)
    }

    private getRule (ruleName: string): Rule {
        if (!this.rules.has(ruleName)) {
            throw new Error('Unknown rule name: ' + ruleName)
        }
        return this.rules.get(ruleName)!
    }

    private validateValue (value: any, rules: Array<string>): string {
        for (const ruleString of rules) {
            const ruleName: RuleName = ValidatorHelper.parseRuleName(ruleString)
            const rule: Rule = this.getRule(ruleName.getName())
            const ruleValidation: RuleValidation = rule.validate(value, ruleName.getArgs())

            if (ruleValidation.shouldExit()) {
                return ruleValidation.getError()
            }
            if (ruleValidation.isValid()) {
                continue
            }
            return ruleValidation.getError()
        }

        return ''
    }
}
