<template>
    <div class="material__body material__body--with-nav">
        <section class="material__container">
            <role-card
                title="Create Role"
                :form="form"
                :permissions="permissions"
                @submit="save($event)"
                @cancel="cancel()"
                @permission="createPermission($event)"></role-card>
        </section>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import RoleCard from '@/components/domain/role/RoleCard.vue'
    import { Channel, ProxyChannel } from '@wildebeest/observable'
    import { ListWatcher, SingleResourceWatcher } from '@/lib/watcher'
    import { Uid } from '../Uid'

    @Component({
        components: {
            RoleCard
        }
    })
    export default class RoleCreate extends Vue {
        @Prop() readonly channel!: Channel<any>
        @Prop() readonly store!: any
        @Prop() readonly project!: any

        public uid = Uid.next()

        public form: any = {}
        public formWatcher = new SingleResourceWatcher()

        public permissions: any[] = []
        public permissionsProperty: Channel<any[]> = new ProxyChannel()
        public permissionsWatcher = new ListWatcher()

        public created (): void {
            this.channel.dispatch({
                event: 'permission@load',
                data: this.project.uuid
            })

            this.permissionsProperty.connectFn((items: any[]) => {
                this.permissions = items
            })
            this.permissionsWatcher.withRepository(this.store.permissions)
                .withBinding(this.permissionsProperty)

            this.formWatcher.withRepository(this.store.forms)
                .withBindingFn(this.onFormChange.bind(this))
                .withId(this.uid)
        }

        public beforeDestroy (): void {
            this.permissionsWatcher.stop()
            this.formWatcher.stop()
        }

        public onFormChange (item: any): void {
            this.form = item
        }

        public cancel (): void {
            this.$router.push({
                name: 'role.list',
                params: this.$route.params
            })
        }

        public save (model: any): void {
            this.channel.dispatch({
                event: 'role@create',
                data: {
                    uid: this.uid,
                    body: {
                        name: model.name,
                        permissions: model.permissions,
                        project_uuid: this.project.uuid
                    },
                    success: (project: any) => {
                        this.$router.push({
                            name: 'role.list',
                            params: this.$route.params
                        })
                    }
                }
            })
        }

        public createPermission (name: string): void {
            this.channel.dispatch({
                event: 'permission@create',
                data: {
                    body: {
                        project_uuid: this.project.uuid,
                        name: name
                    }
                }
            })
        }
    }
</script>

<style lang="scss"></style>
