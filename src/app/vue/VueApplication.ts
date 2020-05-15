import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/views/App.vue'
import Layout from '@/views/Layout.vue'
import Index from '@/views/Index.vue'
import ProjectCreate from '@/views/ProjectCreate.vue'
import ProjectLayout from '@/views/ProjectLayout.vue'
import ProjectDetail from '@/views/ProjectDetail.vue'
import { Listenable, Closable } from '@/lib/broadcast'
import { Listener } from '@/lib/broadcast/Listener'
import { Channel } from '@/lib/broadcast/Channel'
import { Framework } from '@/lib/framework'
import { VueEventAdapter } from './VueEventAdapter'
import { PropertyChange } from '@wildebeest/observe-changes'

export class VueApplication implements Listenable {
    private channel: Channel

    public constructor (framework: Framework) {
        this.channel = framework.getChannel()

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
                            props: {
                                channel: this.channel,
                                projectsProperty: framework.getObservable('projects')
                            }
                        },
                        {
                            path: 'create',
                            component: ProjectCreate,
                            props: { channel: this.channel }
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

        framework.getObservable('scene').addListener((change: PropertyChange<string>) => {
            router.push(change.next())
        })

        new Vue({
            router,
            render: h => h(App, {
                props: {
                    alertsProperty: framework.getObservable('alerts'),
                    channel: this.channel
                }
            })
        }).$mount('#app')
    }

    public addListener (listener: Listener): Closable {
        return this.channel.addListener(listener)
    }

    public removeListener (listener: Listener): void {
        this.channel.removeListener(listener)
    }
}
