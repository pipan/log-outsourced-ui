import { Service } from '@/app/service/Service'
import { Context } from '@/app/Context'
import { Closable, Broadcast } from '@/lib/broadcast'
import { ProjectOpenListener } from './listeners/ProjectOpenListener'
import { ProjectCreateListener } from './listeners/ProjectCreateListener'
import { ProjectCreateCancelListener } from './listeners/ProjectCreateCancelListener'

export class ProjectService implements Service {
    private broadcast: Broadcast
    private closables: Array<Closable> = []

    public constructor (context: Context) {
        this.broadcast = context.broadcast()
    }

    public start (): void {
        this.closables.push(
            this.broadcast.channel('project.open')
                .addListener(new ProjectOpenListener())
        )

        this.closables.push(
            this.broadcast.channel('project.create')
                .addListener(new ProjectCreateListener(this.broadcast))
        )

        this.closables.push(
            this.broadcast.channel('project.create.cancel')
                .addListener(new ProjectCreateCancelListener(this.broadcast))
        )
    }

    public stop (): void {
        for (const closable of this.closables) {
            closable.close()
        }
    }
}
