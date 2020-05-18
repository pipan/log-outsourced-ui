import { Validation } from './Validation'

export interface Validator {
    validate (data: any): Validation;
}
