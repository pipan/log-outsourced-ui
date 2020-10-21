import { Repository, QueryResult } from '@wildebeest/repository'
import { Channel, ProxyChannel } from '@wildebeest/observable'
import { Identifiable } from '@wildebeest/repository/dist/identify/Identifiable'
import { QueryWatcher } from './QueryWatcher'

export class SingleResourceWatcher<T extends Identifiable> {
    private repository: Repository<T> | null = null
    private watchValue: any | null = null
    private queryWatcher: QueryWatcher<T> = new QueryWatcher()

    public start (): SingleResourceWatcher<T> {
        if (!this.repository || !this.watchValue) {
            return this
        }

        const query: QueryResult<T> = this.repository.query()
            .property(this.watchValue)

        this.queryWatcher.withQuery(query)

        return this
    }

    public stop (): SingleResourceWatcher<T> {
        this.queryWatcher.stop()
        return this
    }

    public restart (): SingleResourceWatcher<T> {
        this.stop()
        this.start()
        return this
    }

    public withId (value: any): SingleResourceWatcher<T> {
        this.watchValue = value
        return this.restart()
    }

    public withBinding (binding: Channel<T>): SingleResourceWatcher<T> {
        this.queryWatcher.withBinding(binding)
        return this.restart()
    }

    public withBindingFn (fn: (item: any) => void): SingleResourceWatcher<T> {
        const property: Channel<any> = new ProxyChannel()
        property.connectFn(fn)
        return this.withBinding(property)
    }

    public withRepository (repository: Repository<T>): SingleResourceWatcher<T> {
        this.repository = repository
        return this.restart()
    }
}
