import { Service } from './Service'

export class StackService implements Service {
    protected services: Array<Service> = []

    public constructor (services: Array<Service>) {
        this.services = services
    }

    public start (): void {
        for (const service of this.services) {
            service.start()
        }
    }

    public stop (): void {
        for (const service of this.services) {
            service.stop()
        }
    }
}
