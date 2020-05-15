import { Context } from './Context'

export interface Module {
    install (context: Context): void;
}
