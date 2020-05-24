import Vue from 'vue'
import VueRouter, { Route } from 'vue-router'
import App from '@/views/App.vue'
import Layout from '@/views/Layout.vue'
import Index from '@/views/Index.vue'
import ProjectCreate from '@/views/ProjectCreate.vue'
import ProjectLayout from '@/views/ProjectLayout.vue'
import ProjectDetail from '@/views/ProjectDetail.vue'
import ListenerCreate from '@/views/ListenerCreate.vue'
import { Listenable, Closable } from '@/lib/broadcast'
import { Listener } from '@/lib/broadcast/Listener'
import { Channel } from '@/lib/broadcast/Channel'
import { Framework } from '@/lib/framework'
import { PropertyChange } from '@wildebeest/observe-changes'

export class VueApplication implements Listenable {
    private channel: Channel

    public constructor (framework: Framework) {
        this.channel = framework.getChannel()

        const shared: any = {
            alerts: framework.getObservable('alerts'),
            projects: framework.getObservable('projects'),
            projectActive: framework.getObservable('project.active'),
            projectCreate: framework.getObservable('project.create'),
            listeners: framework.getObservable('listeners'),
            listenerActive: framework.getObservable('listener.active'),
            listenerCreate: framework.getObservable('listener.create'),
            listenerEdit: framework.getObservable('listener.edit'),
            handlers: framework.getObservable('handlers'),
            handlerFormSchema: framework.getObservable('handler.form.schema'),
            handlerFormOptions: framework.getObservable('handler.form.options'),
            api: framework.getObservable('api')
        }

        const props: any = {
            channel: this.channel,
            shared: shared
        }

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
                            props: props
                        },
                        {
                            path: 'create',
                            component: ProjectCreate,
                            props: props
                        }
                    ]
                },
                {
                    path: '/project',
                    component: ProjectLayout,
                    props: props,
                    children: [
                        {
                            path: '',
                            component: ProjectDetail,
                            props: {
                                channel: this.channel,
                                shared: shared
                            }
                        },
                        {
                            path: 'rule/create',
                            component: ListenerCreate,
                            props: {
                                channel: this.channel,
                                shared: shared
                            }
                        }
                    ]
                }
            ],
            mode: 'history'
        })

        framework.getObservable('scene').addListener((change: PropertyChange<string>) => {
            if (router.currentRoute.path === change.next()) {
                return
            }
            router.push(change.next())
        })

        new Vue({
            router,
            render: h => h(App, {
                props: {
                    channel: this.channel,
                    alertList: framework.getObservable('alerts')
                }
            })
        }).$mount('#app')

        if (router.currentRoute.query.pid) {
            this.channel.dispatch({
                event: 'project@load',
                data: router.currentRoute.query.pid
            })
        }
        if (router.currentRoute.query.rid) {
            this.channel.dispatch({
                event: 'listener@active',
                data: router.currentRoute.query.rid
            })
        }
    }

    public addListener (listener: Listener): Closable {
        return this.channel.addListener(listener)
    }

    public removeListener (listener: Listener): void {
        this.channel.removeListener(listener)
    }
}
