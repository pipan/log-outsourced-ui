import { Module, BootContext, RegisterContext, Store } from '@/lib/framework'
import { ServerValidator } from './ServerValidator'

export class FormModule implements Module {
    private store: Store
    private serverValidator: ServerValidator

    constructor () {
        this.store = (new Store())
            .withRepository('forms', 'id')

        this.serverValidator = new ServerValidator(this.store.get('forms'))
    }

    public boot (context: BootContext): void {
        context.withStore(this.store)
    }

    public register (context: RegisterContext, store: Store): void {
        console.log('form module: register')
    }

    public getServerValidator (): ServerValidator {
        return this.serverValidator
    }
}
