import { Framework } from '../Framework'
import { Dispatchable } from '@wildebeest/observable'

export class OutsideEventListener implements Dispatchable<any> {
    private framework: Framework

    public constructor (framework: Framework) {
        this.framework = framework
    }

    public dispatch (data?: any): void {
        this.framework.process(data.event, data?.data)
    }
}
