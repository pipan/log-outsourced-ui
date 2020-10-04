import { Repository, QueryResult } from '@wildebeest/repository'
import { Channel } from '@wildebeest/observable'
import { Identifiable } from '@wildebeest/repository/dist/identify/Identifiable'
import { QueryWatcher } from './QueryWatcher'

export class ListWatcher<T extends Identifiable> {
    private repository: Repository<T> | null = null
    private queryWatcher: QueryWatcher<T[]> = new QueryWatcher()

    public start (): ListWatcher<T> {
        if (!this.repository) {
            return this
        }

        const query: QueryResult<T[]> = this.repository.query()
            .list()

        this.queryWatcher.withQuery(query)

        return this
    }

    public stop (): ListWatcher<T> {
        this.queryWatcher.stop()
        return this
    }

    public restart (): ListWatcher<T> {
        this.stop()
        this.start()
        return this
    }

    public withRepository (repository: Repository<T>): ListWatcher<T> {
        this.repository = repository
        return this.restart()
    }

    public withBinding (binding: Channel<T[]>): ListWatcher<T> {
        this.queryWatcher.withBinding(binding)
        return this.restart()
    }
}
