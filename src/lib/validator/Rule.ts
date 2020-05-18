import { RuleValidation } from './RuleValidation'

export interface Rule {
    validate (value: any, args: Array<any>): RuleValidation;
}
