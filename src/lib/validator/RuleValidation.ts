export interface RuleValidation {
    isValid (): boolean;
    getError (): string;
    shouldExit (): boolean;
}
