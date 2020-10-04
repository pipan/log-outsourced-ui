import { Repository, SimpleRepository, Change } from '@wildebeest/repository'
import { Identifiable } from '@wildebeest/repository/dist/identify/Identifiable'

export class Storage {
    public static createLocalStorageRepository<T> (storageKey: string): Repository<T> {
        const repository = SimpleRepository.fromKeyProperty<T>('id')
        repository.connectFn((item: Change<T>) => {
            console.log('stringify', JSON.stringify(repository.get()))
            window.localStorage.setItem(storageKey, JSON.stringify(repository.get()))
        })

        // window.localStorage.setItem(storageKey, '[]')

        const data: string | null = window.localStorage.getItem(storageKey)
        if (data === null) {
            return repository
        }
        console.log('parse', JSON.parse(data))
        repository.insertAll(JSON.parse(data))

        return repository
    }
}
