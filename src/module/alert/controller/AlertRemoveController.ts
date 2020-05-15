import { Controller } from '@/lib/framework'
import { ObservableList } from '@wildebeest/observe-changes'
import { AlertContract } from '@/components/alert'

export class AlertRemoveController implements Controller {
    private repository: ObservableList<AlertContract>

    public constructor (repository: ObservableList<AlertContract>) {
        this.repository = repository
    }

    public action (data?: any): void {
        this.repository.remove(data)
    }
}
