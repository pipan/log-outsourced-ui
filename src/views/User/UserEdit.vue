<template>
    <section class="material__container">
        <user-card
            title="Edit user"
            :roles="roles"
            :model="user"
            @submit="save($event)"
            @cancel="cancel()"></user-card>
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    import UserCard from '@/components/domain/user/UserCard.vue'
    import { Channel, ProxyChannel } from '@wildebeest/observable'
    import { ListWatcher } from '@/lib/watcher'

    @Component({
        components: {
            UserCard
        }
    })
    export default class UserCreate extends Vue {
        @Prop() readonly channel!: Channel<any>
        @Prop() readonly store!: any
        @Prop() readonly project!: any
        @Prop() readonly user!: any

        public roles: any[] = []
        public rolesProperty: Channel<any[]> = new ProxyChannel()
        public rolesWatcher = new ListWatcher()

        public created (): void {
            this.channel.dispatch({
                event: 'role@load',
                data: this.project.uuid
            })

            this.rolesProperty.connectFn((items: any[]) => {
                this.roles = []
                for (const item of items) {
                    this.roles.push(item.name)
                }
            })
            this.rolesWatcher.withRepository(this.store.roles)
                .withBinding(this.rolesProperty)
        }

        public beforeDestroy (): void {
            this.rolesWatcher.stop()
        }

        public cancel (): void {
            this.$router.push({
                name: 'user.list',
                params: this.$route.params
            })
        }

        public save (model: any): void {
            model.uuid = this.$route.query.uuid
            this.channel.dispatch({
                event: 'user@update',
                data: {
                    body: model,
                    success: (project: any) => {
                        this.$router.push({
                            name: 'user.list',
                            params: this.$route.params
                        })
                    }
                }
            })
        }
    }
</script>

<style lang="scss"></style>
