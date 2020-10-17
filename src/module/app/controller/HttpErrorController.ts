import { Controller } from '@/lib/framework'
import { Repository } from '@wildebeest/repository'
import { OutsourcedProxyApi } from '@/lib/log-outsourced-api'
import { ApiFactory } from '../../http/ApiFactory'
import { Alertable } from '@/module/alert'

export class HttpErrorController implements Controller {
    private alertable: Alertable

    public constructor (alertable: Alertable) {
        this.alertable = alertable
    }

    public action (data?: any): void {
        this.alertable.error(data)
    }
}
