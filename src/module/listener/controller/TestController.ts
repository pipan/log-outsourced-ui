import { Controller } from '@/lib/framework'
import { LogApi } from '@/lib/log-outsourced-api/domain/log/LogApi'
import { Alertable } from '@/module/alert'

export class TestController implements Controller {
    private logApiFactory: () => LogApi
    private alertable: Alertable

    public constructor (logApiFactory: () => LogApi, alertable: Alertable) {
        this.logApiFactory = logApiFactory
        this.alertable = alertable
    }

    public action (data: {projectUuid: string; rules: string[]}): void {
        if (data.rules.length === 0) {
            return
        }

        const logs: Array<any> = []
        for (const rule of data.rules) {
            logs.push({
                level: rule,
                message: 'This is a test message',
                context: {
                    test: true
                }
            })
        }
        this.logApiFactory().batch(data.projectUuid, logs)
            .then((response: any) => {
                if (response.ok) {
                    this.alertable.info('Test has been send')
                }
            })
    }
}
