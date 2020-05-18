import { Rule } from './Rule'

export interface ValidationRuleProvider {
    register (rules: Map<string, Rule>): void;
}
