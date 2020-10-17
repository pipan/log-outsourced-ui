import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/views/App.vue'
import Layout from '@/views/Layout.vue'
import Index from '@/views/Index.vue'
import NotFound from '@/views/Error/NotFound.vue'
import ConnectionGuard from '@/views/Connection/ConnectionGuard.vue'
import ConnectionLayout from '@/views/Connection/ConnectionLayout.vue'
import ConnectionList from '@/views/Connection/ConnectionList.vue'
import ConnectionCreate from '@/views/Connection/ConnectionCreate.vue'
import ConnectionUpdate from '@/views/Connection/ConnectionUpdate.vue'
import ConnectionInvite from '@/views/Connection/ConnectionInvite.vue'
import ProjectGuard from '@/views/Project/ProjectGuard.vue'
import ProjectLayout from '@/views/Project/ProjectLayout.vue'
import ProjectList from '@/views/Project/ProjectList.vue'
import ProjectCreate from '@/views/Project/ProjectCreate.vue'
import UserView from '@/views/User/UserView.vue'
import UserCreate from '@/views/User/UserCreate.vue'
import RoleView from '@/views/Role/RoleView.vue'
import RoleCreate from '@/views/Role/RoleCreate.vue'
import LoggingView from '@/views/Logging/LoggingView.vue'
import ProjectUpdate from '@/views/Project/ProjectUpdate.vue'
import ProjectSettings from '@/views/ProjectSettings.vue'
import ProjectDetail from '@/views/ProjectDetail.vue'
import AdministratorView from '@/views/Administrator/AdministratorView.vue'
import AdministratorInvite from '@/views/Administrator/AdministratorInvite.vue'
import ListenerDetail from '@/views/ListenerDetail.vue'
import ListenerCreate from '@/views/ListenerCreate.vue'
import { Store } from '@/lib/framework'
import { Channel, ProxyChannel, Closable } from '@wildebeest/observable'

export class VueApplication {
    private channel: Channel<any> = new ProxyChannel()
    private store: Store

    public constructor (store: Store) {
        this.store = store
    }

    public connectFn (fn: (event: any) => void): Closable {
        return this.channel.connectFn(fn)
    }

    public start (): void {
        const props: any = {
            channel: this.channel,
            store: this.store.getData()
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
                    component: ConnectionGuard,
                    props: props,
                    children: [
                        {
                            path: '',
                            component: ConnectionLayout,
                            props: props,
                            name: 'connection',
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
                                    path: 'project/edit',
                                    component: ProjectUpdate,
                                    props: props,
                                    name: 'project.edit',
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
                            path: ':projectUuid',
                            component: ProjectGuard,
                            props: props,
                            children: [
                                {
                                    path: '',
                                    component: ProjectLayout,
                                    props: props,
                                    name: 'project',
                                    children: [
                                        {
                                            path: 'user',
                                            component: UserView,
                                            props: props,
                                            name: 'user.list',
                                            meta: {
                                                nav: 'user'
                                            }
                                        },
                                        {
                                            path: 'user/create',
                                            component: UserCreate,
                                            props: props,
                                            name: 'user.create',
                                            meta: {
                                                nav: 'user'
                                            }
                                        },
                                        {
                                            path: 'role',
                                            component: RoleView,
                                            props: props,
                                            name: 'role.list',
                                            meta: {
                                                nav: 'role'
                                            }
                                        },
                                        {
                                            path: 'role/create',
                                            component: RoleCreate,
                                            props: props,
                                            name: 'role.create',
                                            meta: {
                                                nav: 'role'
                                            }
                                        },
                                        {
                                            path: 'logging',
                                            component: LoggingView,
                                            props: props,
                                            name: 'logging.list',
                                            meta: {
                                                nav: 'logging'
                                            }
                                        }
                                    ]
                                }
                            ]
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
