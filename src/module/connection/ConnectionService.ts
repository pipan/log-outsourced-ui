import { Repository } from '@wildebeest/repository'

export class ConnectionService {
    private repo: Repository<any>

    constructor (repo: Repository<any>) {
        this.repo = repo
    }

    public create (connection: any): any {
        const id = Math.floor(Math.random() * 1000000)
        connection.id = id + ''
        this.repo.insert(connection)
        return connection
    }
}
