import { Service } from '@/lib/framework/service/Service'
import { Closable, ObservableList, ListChange } from '@wildebeest/observe-changes'
import { AlertContract } from '@/components/alert'
import { Channel } from '@/lib/broadcast/Channel'

export class AlertAutohideService implements Service {
    protected closables: Array<Closable> = []
    protected alerts: ObservableList<AlertContract>
    protected channel: Channel
    protected delayMiliseconds: number

    public constructor (delayMmiliseconds: number, alerts: ObservableList<AlertContract>, channel: Channel) {
        this.alerts = alerts
        this.channel = channel
        this.delayMiliseconds = delayMmiliseconds
    }

    public start (): void {
        this.closables.push(
            this.alerts.addListener(
                this.onAlertsChange.bind(this)
            )
        )
    }

    public stop (): void {
        for (const closable of this.closables) {
            closable.close()
        }
    }

    private onAlertsChange (change: ListChange<AlertContract>): void {
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
