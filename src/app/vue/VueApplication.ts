import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/views/App.vue'
import Layout from '@/views/Layout.vue'
import Index from '@/views/Index.vue'
import ProjectCreate from '@/views/ProjectCreate.vue'
import ProjectSettings from '@/views/ProjectSettings.vue'
import ProjectLayout from '@/views/ProjectLayout.vue'
import ProjectDetail from '@/views/ProjectDetail.vue'
import ListenerDetail from '@/views/ListenerDetail.vue'
import ListenerCreate from '@/views/ListenerCreate.vue'
import { Framework } from '@/lib/framework'
import { Channel } from '@wildebeest/observable'

export class VueApplication {
    private channel: Channel<any>

    public constructor (framework: Framework) {
        this.channel = framework.getChannel()

        const queries: any = {
            projects: framework.getRepository('projects')
                .query()
                .list(),
            listeners: framework.getRepository('listeners')
                .query()
                .orderBy('getName')
                .list(),
            handlers: framework.getRepository('handlers')
                .query()
                .map(),
            alerts: framework.getRepository('alerts')
                .query()
                .list(),
            projectCreate: framework.getRepository('properties')
                .query()
                .property('project.create'),
            projectActive: framework.getRepository('properties')
                .query()
                .property('project.active'),
            listenerCreate: framework.getRepository('properties')
                .query()
                .property('listener.create'),
            listenerEdit: framework.getRepository('properties')
                .query()
                .property('listener.edit'),
            listenerActive: framework.getRepository('properties')
                .query()
                .property('listener.active'),
            api: framework.getRepository('properties')
                .query()
                .property('api')
        }

        const props: any = {
            channel: this.channel,
            queries: queries
        }

        Vue.use(VueRouter)

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
                            props: props,
                            children: [
                                {
                                    path: 'rule',
                                    component: ListenerDetail,
                                    props: props
                                }
                            ]
                        },
                        {
                            path: 'rule/create',
                            component: ListenerCreate,
                            props: props
                        },
                        {
                            path: 'settings',
                            component: ProjectSettings,
                            props: props
                        }
                    ]
                }
            ],
            mode: 'history'
        })

        new Vue({
            router,
            render: h => h(App, {
                props: props
            })
        }).$mount('#app')
    }
}
