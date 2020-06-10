import { Controller } from '@/lib/framework'
import { AlertContract } from '@/components/alert'
import { Repository } from '@wildebeest/repository'

export class AlertRemoveController implements Controller {
    private repository: Repository<AlertContract>

    public constructor (repository: Repository<AlertContract>) {
        this.repository = repository
    }

    public action (data?: any): void {
        this.repository.remove(data)
    }
}
