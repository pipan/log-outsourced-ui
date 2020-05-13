import { Service } from '@/app/service/Service'
import { Context } from '@/app/Context'
import { Closable, Broadcast } from '@/lib/broadcast'
import { ProjectOpenListener } from './listeners/ProjectOpenListener'

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
    }

    public stop (): void {
        for (const closable of this.closables) {
            closable.close()
        }
    }
}
