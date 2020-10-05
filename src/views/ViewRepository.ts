import { Closable, Connectable } from '@wildebeest/observable'
import { PropertyEntity } from '@/lib/framework'

export class ViewRepository {
    public data: any
    private closables: Array<Closable> = []

    public constructor (data: any) {
        this.data = data
    }

    public bindValue (key: string, channel: Connectable<any>): void {
        this.closables.push(
            channel.connectFn((value: any) => {
                this.data[key] = value
            })
        )
    }

    public bindProperty (key: string, channel: Connectable<PropertyEntity>): void {
        this.closables.push(
            channel.connectFn((value: PropertyEntity) => {
                this.data[key] = value.get()
            })
        )
    }

    public unbindAll (): void {
        for (const closable of this.closables) {
            closable.close()
        }
    }
}
