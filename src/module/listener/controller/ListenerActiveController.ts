import { Controller } from '@/lib/framework'
import { ObservableProperty } from '@wildebeest/observe-changes'

export class ListenerActiveController implements Controller {
    private listenerUuid: ObservableProperty<string>

    public constructor (listenerUuid: ObservableProperty<string>) {
        this.listenerUuid = listenerUuid
    }

    public action (uuid: string): void {
        this.listenerUuid.set(uuid)
    }
}
