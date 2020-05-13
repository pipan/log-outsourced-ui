import { Listener } from '@/lib/broadcast/Listener'
import VueRouter from 'vue-router'

export class RouteChangeListener implements Listener {
    private router: VueRouter

    public constructor (router: VueRouter) {
        this.router = router
    }

    public handle (data?: any): void {
        this.router.push(data)
    }
}
