<template>
    <section class="material__container">
        <role-card
            v-if="role"
            :title="role.name"
            :model="role"
            :permissions="permissions"
            :form="form"
            @submit="save($event)"
            @cancel="cancel()"
            @permission="createPermission($event)"></role-card>
        <error-status
            v-if="!role"
            status="404"
            message="Rule not found"></error-status>
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import RoleCard from '@/components/domain/role/RoleCard.vue'
    import ErrorStatus from '@/components/error/ErrorStatus.vue'
    import { Channel, ProxyChannel } from '@wildebeest/observable'
    import { ListWatcher, SingleResourceWatcher } from '@/lib/watcher'
    import { Uid } from '../Uid'

    @Component({
        components: {
            RoleCard,
            ErrorStatus
        }
    })
    export default class RoleEdit extends Vue {
        @Prop() readonly channel!: Channel<any>
        @Prop() readonly store!: any
        @Prop() readonly project!: any
        @Prop() readonly role!: any

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
            model.uuid = this.$route.query.uuid
            this.channel.dispatch({
                event: 'role@update',
                data: {
                    uid: this.uid,
                    body: model
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
