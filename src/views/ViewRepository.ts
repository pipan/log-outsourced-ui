import { ObservableProperty, PropertyChange, ObservableList, Closable } from '@wildebeest/observe-changes'

export class ViewRepository {
    public data: any
    private closables: Array<Closable> = []

    public constructor (data: any) {
        this.data = data
    }

    public bindProperty (key: string, property: ObservableProperty<any>): void {
        this.closables.push(
            property.addListenerAndCall((change: PropertyChange<any>) => {
                this.data[key] = change.next()
            })
        )
    }

    public bindList (key: string, list: ObservableList<any>): void {
        this.closables.push(
            list.addListenerAndCall(() => {
                this.data[key] = list.all()
            })
        )
    }

    public unbindAll (): void {
        for (const closable of this.closables) {
            closable.close()
        }
    }
}
