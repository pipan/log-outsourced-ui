import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/views/App.vue'
import Layout from '@/views/Layout.vue'
import Index from '@/views/Index.vue'
import NotFound from '@/views/Error/NotFound.vue'
import ConnectionLayout from '@/views/Connection/ConnectionLayout.vue'
import ConnectionList from '@/views/Connection/ConnectionList.vue'
import ConnectionCreate from '@/views/Connection/ConnectionCreate.vue'
import ConnectionUpdate from '@/views/Connection/ConnectionUpdate.vue'
import ConnectionInvite from '@/views/Connection/ConnectionInvite.vue'
import ProjectList from '@/views/Project/ProjectList.vue'
import ProjectCreate from '@/views/Project/ProjectCreate.vue'
import ProjectSettings from '@/views/ProjectSettings.vue'
import ProjectLayout from '@/views/Project/ProjectLayout.vue'
import ProjectDetail from '@/views/ProjectDetail.vue'
import AdministratorView from '@/views/Administrator/AdministratorView.vue'
import AdministratorInvite from '@/views/Administrator/AdministratorInvite.vue'
import ListenerDetail from '@/views/ListenerDetail.vue'
import ListenerCreate from '@/views/ListenerCreate.vue'
import { Framework } from '@/lib/framework'
import { Channel } from '@wildebeest/observable'

export class VueApplication {
    private channel: Channel<any>

    public constructor (framework: Framework) {
        this.channel = framework.getChannel()

        const properties: any = {
            auth: framework.getObservable('auth'),
            connection: framework.getObservable('connection')
        }
        const repositories: any = {
            projects: framework.getRepository('projects'),
            administrators: framework.getRepository('administrators'),
            connections: framework.getRepository('connections'),
            invites: framework.getRepository('invites'),
            alerts: framework.getRepository('alerts')
        }
        const queries: any = {}

        const props: any = {
            channel: this.channel,
            queries: queries,
            repositories: repositories,
            properties: properties
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
                            component: ConnectionList,
                            props: props
                        },
                        {
                            path: 'connection/create',
                            component: ConnectionCreate,
                            props: props
                        },
                        {
                            path: 'connection/update',
                            component: ConnectionUpdate,
                            props: props
                        },
                        {
                            path: 'connection/invite/:token',
                            component: ConnectionInvite,
                            props: props
                        }
                    ]
                },
                {
                    path: '/:connectionId',
                    component: ConnectionLayout,
                    props: props,
                    children: [
                        {
                            path: '',
                            component: ProjectList,
                            props: props,
                            name: 'project.list',
                            meta: {
                                nav: 'project'
                            }
                        },
                        {
                            path: 'project/create',
                            component: ProjectCreate,
                            props: props,
                            name: 'project.create',
                            meta: {
                                nav: 'project'
                            }
                        },
                        {
                            path: 'admins',
                            component: AdministratorView,
                            props: props,
                            name: 'administrator.list',
                            meta: {
                                nav: 'administrator'
                            }
                        },
                        {
                            path: 'admins/invite',
                            component: AdministratorInvite,
                            props: props,
                            name: 'administrator.invite',
                            meta: {
                                nav: 'administrator'
                            }
                        }
                    ]
                },
                {
                    path: '/:connectionId/:projectUuid',
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
                },
                {
                    path: '*',
                    component: NotFound
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
