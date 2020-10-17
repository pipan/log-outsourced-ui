import { Controller } from '@/lib/framework'
import { Repository } from '@wildebeest/repository'

export class AlertRemoveController implements Controller {
    private repository: Repository<any>

    public constructor (repository: Repository<any>) {
        this.repository = repository
    }

    public action (data?: any): void {
        this.repository.remove(data)
    }
}
