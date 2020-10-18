<template>
    <section>
        <role-card
            title="Create role"
            :permissions="permissions"
            @submit="save($event)"
            @cancel="cancel()"></role-card>
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import RoleCard from '@/components/domain/role/RoleCard.vue'
    import { Channel, ProxyChannel } from '@wildebeest/observable'
    import { ListWatcher } from '@/lib/watcher'

    @Component({
        components: {
            RoleCard
        }
    })
    export default class RoleCreate extends Vue {
        @Prop() readonly channel!: Channel<any>
        @Prop() readonly store!: any
        @Prop() readonly project!: any

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
            console.log('save', model)
            // this.channel.dispatch({
            //     event: 'role@create',
            //     data: {
            //         body: {
            //             name: model.name,
            //             permissions: ['user.view'],
            //             project_uuid: this.project.uuid
            //         },
            //         success: (project: any) => {
            //             this.$router.push({
            //                 name: 'role.list',
            //                 params: this.$route.params
            //             })
            //         }
            //     }
            // })
        }
    }
</script>

<style lang="scss"></style>
