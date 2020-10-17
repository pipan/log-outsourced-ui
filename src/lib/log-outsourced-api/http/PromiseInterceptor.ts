import { Channel, ProxyChannel, Dispatchable, Closable } from '@wildebeest/observable'

export class PromiseInterceptor {
    private channel: Channel<any> = new ProxyChannel()

    public connect (dispatchable: Dispatchable<any>): Closable {
        return this.channel.connect(dispatchable)
    }

    public connectFn (fn: (event: any) => void): Closable {
        return this.channel.connectFn(fn)
    }

    public intercept (promise: Promise<any>): Promise<any> {
        return promise.then((response: any) => {
                this.channel.dispatch({
                    type: 'response',
                    response: response
                })
                return response
            })
            .catch((err: any) => {
                this.channel.dispatch({
                    type: 'error',
                    response: err
                })
                // todo: netreba to vyhodit exception
                return err
            })
    }
}
