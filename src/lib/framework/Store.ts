import { SimpleRepository } from '@wildebeest/repository'
import { EagerObservable } from '@wildebeest/observable'

export class Store {
    private data: {[key: string]: any}

    constructor (data: {[key: string]: any} = {}) {
        this.data = data
    }

    public getData (): {[key: string]: any} {
        return this.data
    }

    public get (key: string): any {
        return this.data[key]
    }

    public withItem (key: string, value: any): Store {
        const clone = Object.assign({}, this.data)
        clone[key] = value
        return new Store(clone)
    }

    public withRepository (key: string, index = 'id'): Store {
        return this.withItem(key, SimpleRepository.fromKeyProperty(index))
    }

    public withStore (store: Store): Store {
        const data = store.getData()
        let result = new Store(this.data)
        for (const key in data) {
            result = result.withItem(key, data[key])
        }
        return result
    }

    public withObservable (key: string, value: any = null): Store {
        return this.withItem(key, new EagerObservable(value))
    }
}
