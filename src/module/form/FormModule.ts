import { Module, BootContext, RegisterContext, Store } from '@/lib/framework'
import { FormValidator } from './FormValidator'

export class FormModule implements Module {
    private store: Store
    private FormValidator: FormValidator

    constructor () {
        this.store = (new Store())
            .withRepository('forms', 'id')

        this.FormValidator = new FormValidator(this.store.get('forms'))
    }

    public boot (context: BootContext): void {
        context.withStore(this.store)
    }

    public register (context: RegisterContext, store: Store): void {
        console.log('form module: register')
    }

    public getFormValidator (): FormValidator {
        return this.FormValidator
    }
}
