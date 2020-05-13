import { Listener } from '@/lib/broadcast/Listener'

export class ProjectOpenListener implements Listener {
    public handle (data: any): void {
        console.log('Open project', data)
    }
}
