import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/views/App.vue'
import Layout from '@/views/Layout.vue'
import NotFound from '@/views/Error/NotFound.vue'
import ConnectionGuard from '@/views/Connection/ConnectionGuard.vue'
import ConnectionLayout from '@/views/Connection/ConnectionLayout.vue'
import ConnectionList from '@/views/Connection/ConnectionList.vue'
import ConnectionCreate from '@/views/Connection/ConnectionCreate.vue'
import ConnectionEdit from '@/views/Connection/ConnectionEdit.vue'
import ConnectionInvite from '@/views/Connection/ConnectionInvite.vue'
import ProjectGuard from '@/views/Project/ProjectGuard.vue'
import ProjectLayout from '@/views/Project/ProjectLayout.vue'
import ProjectList from '@/views/Project/ProjectList.vue'
import ProjectCreate from '@/views/Project/ProjectCreate.vue'
import ProjectEdit from '@/views/Project/ProjectEdit.vue'
import UserView from '@/views/User/UserView.vue'
import UserCreate from '@/views/User/UserCreate.vue'
import UserEdit from '@/views/User/UserEdit.vue'
import UserSettings from '@/views/User/UserSettings.vue'
import RoleView from '@/views/Role/RoleView.vue'
import RoleCreate from '@/views/Role/RoleCreate.vue'
import RoleEdit from '@/views/Role/RoleEdit.vue'
import LoggingView from '@/views/Logging/LoggingView.vue'
import ListenerCreate from '@/views/Logging/ListenerCreate.vue'
import ListenerEdit from '@/views/Logging/ListenerEdit.vue'
import SettingsLayout from '@/views/Settings/SettingsLayout.vue'
import AdministratorView from '@/views/Administrator/AdministratorView.vue'
import AdministratorInvite from '@/views/Administrator/AdministratorInvite.vue'
import ProjectKeyList from '@/views/ProjectKey/ProjectKeyList.vue'
import ProjectKeyCreate from '@/views/ProjectKey/ProjectKeyCreate.vue'
import ProjectKeyRename from '@/views/ProjectKey/ProjectKeyRename.vue'
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
                            props: props,
                            name: 'connection.list'
                        },
                        {
                            path: 'connection/create',
                            component: ConnectionCreate,
                            props: props,
                            name: 'connection.create'
                        },
                        {
                            path: 'connection/edit',
                            component: ConnectionEdit,
                            props: props,
                            name: 'connection.edit'
                        },
                        {
                            path: 'connection/invite/:token',
                            component: ConnectionInvite,
                            props: props,
                            name: 'connection.invite'
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
                                    component: ProjectEdit,
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
                                            },
                                            children: [
                                                {
                                                    path: 'edit',
                                                    component: UserEdit,
                                                    props: props,
                                                    name: 'user.edit',
                                                    meta: {
                                                        nav: 'user'
                                                    }
                                                }
                                            ]
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
                                            },
                                            children: [
                                                {
                                                    path: 'edit',
                                                    component: RoleEdit,
                                                    props: props,
                                                    name: 'role.edit',
                                                    meta: {
                                                        nav: 'role'
                                                    }
                                                }
                                            ]
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
                                            },
                                            children: [
                                                {
                                                    path: 'edit',
                                                    component: ListenerEdit,
                                                    props: props,
                                                    name: 'logging.edit',
                                                    meta: {
                                                        nav: 'logging'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            path: 'logging/create',
                                            component: ListenerCreate,
                                            props: props,
                                            name: 'logging.create',
                                            meta: {
                                                nav: 'logging'
                                            }
                                        }
                                    ]
                                },
                                {
                                    path: 'settings',
                                    component: SettingsLayout,
                                    props: props,
                                    name: 'settings',
                                    children: [
                                        {
                                            path: 'project',
                                            component: ProjectKeyList,
                                            props: props,
                                            name: 'projectkey.list',
                                            meta: {
                                                nav: 'projectkey'
                                            }
                                        },
                                        {
                                            path: 'project/create',
                                            component: ProjectKeyCreate,
                                            props: props,
                                            name: 'projectkey.create',
                                            meta: {
                                                nav: 'projectkey'
                                            }
                                        },
                                        {
                                            path: 'project/rename',
                                            component: ProjectKeyRename,
                                            props: props,
                                            name: 'projectkey.rename',
                                            meta: {
                                                nav: 'projectkey'
                                            }
                                        },
                                        {
                                            path: 'user',
                                            component: UserSettings,
                                            props: props,
                                            name: 'settings.user',
                                            meta: {
                                                nav: 'user'
                                            }
                                        }
                                    ]
                                }
                            ]
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
