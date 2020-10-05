import { Module } from '@/lib/framework'
import { AlertCreateController } from './controller/AlertCreateController'
import { AlertRemoveController } from './controller/AlertRemoveController'
import { Context } from '@/lib/framework/module/Context'
import { AlertContract } from '@/components/alert'
import { AlertAutohideService } from './service/AlertAutohideService'
import { Repository, SimpleRepository } from '@wildebeest/repository'
import { IncrementalStringGenerator } from '@/lib/generator'

export class AlertModule implements Module {
    public install (context: Context): void {
        const alerts: Repository<AlertContract> = SimpleRepository.createIdentifiable()

        context.repositories().insert('alerts', alerts)

        context.controllers().insert('alert@create', new AlertCreateController(new IncrementalStringGenerator(), alerts))
        context.controllers().insert('alert@remove', new AlertRemoveController(alerts))

        const autohideService: AlertAutohideService = new AlertAutohideService(3000, alerts, context.channel())
        autohideService.start()
    }
}
