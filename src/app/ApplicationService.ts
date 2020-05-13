import { Service } from './service/Service'
import { ProjectService } from './domain/project/ProjectService'
import { StackService } from './service/StackService'
import { GuiService } from './gui/GuiService'
import { BroadcastService } from './BroadcastService'
import { Context } from './Context'

export class ApplicationService implements Service {
    protected stackService: Service;
    protected contextValue: Context

    constructor () {
        const broadcastService: BroadcastService = new BroadcastService()

        this.contextValue = new Context(
            broadcastService.broadcast()
        )

        this.stackService = new StackService([
            broadcastService,
            new ProjectService(this.contextValue),
            new GuiService(this.contextValue)
        ])
    }

    public context (): Context {
        return this.contextValue
    }

    public start (): void {
        this.stackService.start()
    }

    public stop (): void {
        this.stackService.stop()
    }
}
