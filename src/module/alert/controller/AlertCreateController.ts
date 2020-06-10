import { Controller } from '@/lib/framework/controller/Controller'
import { SimpleAlert, AlertContract } from '@/components/alert'
import { Repository } from '@wildebeest/repository'
import { Generatable } from '@/lib/generator'

export class AlertCreateController implements Controller {
    private repository: Repository<AlertContract>
    private generator: Generatable<string>

    public constructor (generator: Generatable<string>, repository: Repository<AlertContract>) {
        this.repository = repository
        this.generator = generator
    }

    public action (data: any): void {
        this.repository.insert(
            new SimpleAlert(this.generator.generate(), data.message, data.type)
        )
    }
}
