import { Controller } from '@/lib/framework/controller/Controller'
import { SimpleAlert, AlertContract } from '@/components/alert'
import { ObservableList } from '@wildebeest/observe-changes'

export class AlertCreateController implements Controller {
    private repository: ObservableList<AlertContract>

    public constructor (repository: ObservableList<AlertContract>) {
        this.repository = repository
    }

    public action (data: any): void {
        this.repository.add(
            new SimpleAlert(data.message, data.type)
        )
    }
}
