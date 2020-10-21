<template>
    <div class="material__body material__body--with-nav">
        <section class="material__container">
            <div class="card">
                <form @submit.prevent="cancel()">
                    <header class="card__header">User Settings</header>
                    <div class="card__body">
                        <multi-select
                            label="Roles for new user"
                            :value="model.roles"
                            :options="roles"
                            filterAvailableSince="6"
                            @change="model.roles = $event"></multi-select>
                    </div>
                    <footer class="card__footer">
                        <button type="button" class="btn btn--secondary" @click="cancel()">CANCEL</button>
                    </footer>
                </form>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import MultiSelect from '@/components/form/MultiSelect.vue'
    import { Channel, ProxyChannel } from '@wildebeest/observable'
    import { ListWatcher } from '@/lib/watcher'

    @Component({
        components: {
            MultiSelect
        }
    })
    export default class UserSettings extends Vue {
        @Prop() readonly channel!: Channel<any>
        @Prop() readonly store!: any
        @Prop() readonly project!: any

        public model: any = {}

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
    }
</script>

<style lang="scss"></style>
