import { Service } from '../service/Service'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/views/App.vue'
import Layout from '@/views/Layout.vue'
import Index from '@/views/Index.vue'
import ProjectCreate from '@/views/ProjectCreate.vue'
import ProjectLayout from '@/views/ProjectLayout.vue'
import ProjectDetail from '@/views/ProjectDetail.vue'
import { Context } from '../Context'
import { Broadcast, Closable } from '@/lib/broadcast'
import { RouteChangeListener } from './listeners/RouteChangeListener'

export class GuiService implements Service {
    private broadcast!: Broadcast
    private vue: Vue | null = null
    private closables: Array<Closable> = []

    public constructor (context: Context) {
        this.broadcast = context.broadcast()
    }

    public start (): void {
        Vue.use(VueRouter)
        Vue.config.productionTip = false

        const router = new VueRouter({
            routes: [
                {
                    path: '',
                    component: Layout,
                    children: [
                        {
                            path: '',
                            component: Index,
                            props: { broadcast: this.broadcast }
                        },
                        {
                            path: 'create',
                            component: ProjectCreate,
                            props: { broadcast: this.broadcast }
                        }
                    ]
                },
                {
                    path: '/project',
                    component: ProjectLayout,
                    children: [
                        {
                            path: ':uuid',
                            component: ProjectDetail
                        }
                    ]
                }
            ],
            mode: 'history'
        })

        this.closables.push(
            this.broadcast.channel('route.change')
                .addListener(new RouteChangeListener(router))
        )

        this.vue = new Vue({
            router,
            render: h => h(App)
        }).$mount('#app')
    }

    public stop (): void {
        for (const closable of this.closables) {
            closable.close()
        }
        if (this.vue == null) {
            return
        }
        this.vue.$destroy()
        this.vue = null
    }
}
