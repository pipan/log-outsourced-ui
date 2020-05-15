import { Listener } from '@/lib/broadcast/Listener'
import { Framework } from '../Framework'

export class OutsideEventListener implements Listener {
    private framework: Framework

    public constructor (framework: Framework) {
        this.framework = framework
    }

    public handle (data?: any): void {
        this.framework.process(data.event, data?.data)
    }
}
