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
import { ProjectDetailResolver } from './resolver/ProjectDetailResolver'
import { ProjectListResolver } from './resolver/ProjectListResolver'
import { Resolver } from './resolver/Resolver'
import { SceneChangeResolver, EventResolver } from './resolver/EventResolver'

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
                            name: 'index',
                            component: Index,
                            props: {
                                channel: this.channel,
                                projectsProperty: framework.getObservable('projects')
                            }
                        },
                        {
                            path: 'create',
                            name: 'project.create',
                            component: ProjectCreate,
                            props: {
                                channel: this.channel,
                                modelProperty: framework.getObservable('project.create')
                            }
                        }
                    ]
                },
                {
                    path: '/project',
                    component: ProjectLayout,
                    props: {
                        channel: this.channel,
                        projectProperty: framework.getObservable('project.active'),
                        apiProperty: framework.getObservable('api')
                    },
                    children: [
                        {
                            path: 'listener/create',
                            name: 'listener.create',
                            component: ListenerCreate,
                            props: {
                                channel: this.channel,
                                modelProperty: framework.getObservable('listener.create'),
                                handlersProperty: framework.getObservable('handlers'),
                                activeProjectProperty: framework.getObservable('project.active'),
                                handlerSchemaProperty: framework.getObservable('handler.form.schema')
                            }
                        },
                        {
                            path: ':uuid',
                            name: 'project.view',
                            component: ProjectDetail,
                            props: {
                                channel: this.channel,
                                activeProject: framework.getObservable('project.active'),
                                listenersProperty: framework.getObservable('listeners')
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

        router.afterEach((to: Route, from: Route) => {
            this.channel.dispatch({
                event: 'scene@change',
                data: to.path
            })
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

        const resolvers: { [key: string]: Resolver } = {
            'project.view': new ProjectDetailResolver(framework.getChannel()),
            index: new ProjectListResolver(framework.getChannel()),
            'project.create': new EventResolver(framework.getChannel(), 'project.create@close'),
            'listener.create': new EventResolver(framework.getChannel(), 'project@all')
        }

        const currentRouteName: string = router.currentRoute.name || ''
        if (resolvers[currentRouteName]) {
            resolvers[currentRouteName].resolve(router.currentRoute.params)
        }
    }

    public addListener (listener: Listener): Closable {
        return this.channel.addListener(listener)
    }

    public removeListener (listener: Listener): void {
        this.channel.removeListener(listener)
    }
}
