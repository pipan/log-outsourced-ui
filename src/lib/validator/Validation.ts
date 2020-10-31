export interface Validation {
    isValid (): boolean;
    getErrors (): Map<string, string>;
}
