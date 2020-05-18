import { Validator } from './Validator'

export interface ValidatorBuilder {
    build (rules: any): Validator;
}
