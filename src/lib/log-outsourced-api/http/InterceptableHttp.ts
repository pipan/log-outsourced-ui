import { PromiseInterceptor } from './PromiseInterceptor'
import { Dispatchable, Closable } from '@wildebeest/observable'

export class InterceptableHttp {
    protected interceptor: PromiseInterceptor = new PromiseInterceptor()

    protected send (promise: Promise<any>): Promise<any> {
        return this.interceptor.intercept(promise)
    }

    public connect (dispatchable: Dispatchable<any>): Closable {
        return this.interceptor.connect(dispatchable)
    }
}
