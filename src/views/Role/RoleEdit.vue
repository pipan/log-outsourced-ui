<template>
    <section class="material__container">
        <role-card
            v-if="role"
            title="Edit role"
            :model="role"
            :permissions="permissions"
            @submit="save($event)"
            @cancel="cancel()"></role-card>
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
    import { ListWatcher } from '@/lib/watcher'

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
        }

        public beforeDestroy (): void {
            this.permissionsWatcher.stop()
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
                    body: model,
                    success: (project: any) => {
                        this.$router.push({
                            name: 'role.list',
                            params: this.$route.params
                        })
                    }
                }
            })
        }
    }
</script>

<style lang="scss"></style>
