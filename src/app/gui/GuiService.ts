import { Service } from '../service/Service'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/views/App.vue'
import Index from '@/views/Index.vue'
import ProjectLayout from '@/views/ProjectLayout.vue'
import ProjectDetail from '@/views/ProjectDetail.vue'
import { Context } from '../Context'

export class GuiService implements Service {
    private context!: Context
    private vue: Vue | null = null

    public constructor (context: Context) {
        this.context = context
    }

    public start (): void {
        Vue.use(VueRouter)
        Vue.config.productionTip = false

        const services = {
            broadcast: this.context.broadcast()
        }

        const router = new VueRouter({
            routes: [
                {
                    path: '',
                    component: Index,
                    props: { broadcast: services.broadcast }
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

        this.vue = new Vue({
            router,
            render: h => h(App)
        }).$mount('#app')
    }

    public stop (): void {
        if (this.vue == null) {
            return
        }
        this.vue.$destroy()
        this.vue = null
    }
}
