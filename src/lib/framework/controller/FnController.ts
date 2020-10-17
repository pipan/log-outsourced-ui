import { Controller } from './Controller'

export class FnController implements Controller {
    private fn: (data?: any) => void

    constructor (fn: (data?: any) => void) {
        this.fn = fn
    }

    public action (data?: any): void {
        this.fn(data)
    }
}
