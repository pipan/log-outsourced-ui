import { Service } from '@/lib/framework/service/Service'
import { AlertContract } from '@/components/alert'
import { Closable, Channel } from '@wildebeest/observable'
import { Repository, Change } from '@wildebeest/repository'

export class AlertAutohideService implements Service {
    protected closables: Array<Closable> = []
    protected alerts: Repository<AlertContract>
    protected channel: Channel<any>
    protected delayMiliseconds: number

    public constructor (delayMmiliseconds: number, alerts: Repository<AlertContract>, channel: Channel<any>) {
        this.alerts = alerts
        this.channel = channel
        this.delayMiliseconds = delayMmiliseconds
    }

    public start (): void {
        this.closables.push(
            this.alerts.connectFn(
                this.onAlertsChange.bind(this)
            )
        )
    }

    public stop (): void {
        for (const closable of this.closables) {
            closable.close()
        }
    }

    private onAlertsChange (change: Change<AlertContract>): void {
        for (const alert of change.inserted()) {
            setTimeout(() => {
                this.channel.dispatch({
                    event: 'alert@remove',
                    data: alert
                })
            }, this.delayMiliseconds)
        }
    }
}
