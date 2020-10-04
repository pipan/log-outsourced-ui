import { QueryResult } from '@wildebeest/repository'
import { Channel } from '@wildebeest/observable'

export class QueryWatcher<T> {
    private binding: Channel<T> | null = null
    private query: QueryResult<T> | null = null

    public start (): QueryWatcher<T> {
        if (!this.query) {
            return this
        }

        this.query.connectFn(
            this.onChange.bind(this)
        )
        this.onChange(this.query.get())

        return this
    }

    private onChange (value: T): void {
        if (!this.binding) {
            return
        }
        this.binding.dispatch(value)
    }

    public stop (): QueryWatcher<T> {
        if (!this.query) {
            return this
        }
        this.query.close()
        this.query = null
        return this
    }

    public restart (): QueryWatcher<T> {
        this.stop()
        this.start()
        return this
    }

    public withQuery (query: QueryResult<T>): QueryWatcher<T> {
        this.stop()
        this.query = query
        return this.start()
    }

    public withBinding (binding: Channel<T>): QueryWatcher<T> {
        this.binding = binding
        return this.restart()
    }
}
