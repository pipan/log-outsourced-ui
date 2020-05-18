import { RuleName } from './RuleName'

export class ValidatorHelper {
    public static parseRuleName (rule: string): RuleName {
        const colon: Array<string> = rule.split(':')
        if (colon.length === 1) {
            return new RuleName(colon[0])
        }
        return new RuleName(colon[0], colon[1].split(','))
    }
}
