<template>
    <section>
        <filtered-list
            title="Users"
            @add="create()">
            <double-lined-item
                v-for="item of users"
                :key="item.uuid"
                :text="item.username"
                :subtext="item.roles.join(', ')"
                :value="item"
                :contexts="['Delete']"
                @select="open($event)"
                @delete="remove($event)">
            </double-lined-item>
        </filtered-list>
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    import { Channel, ProxyChannel } from '@wildebeest/observable'
    import Contextmenu from '@/components/contextmenu/Contextmenu.vue'
    import FilteredList from '@/components/list/filtered/FilteredList.vue'
    import DoubleLinedItem from '@/components/list/double/DoubleLinedItem.vue'
    import { ListWatcher, SingleResourceWatcher } from '@/lib/watcher'

    @Component({
        components: {
            Contextmenu,
            FilteredList,
            DoubleLinedItem
        }
    })
    export default class UserView extends Vue {
        @Prop() channel!: Channel<any>
        @Prop() store!: any
        @Prop() project!: any

        public users: any[] = []
        public usersProperty: Channel<any> = new ProxyChannel()
        private watcher = new ListWatcher()

        public created (): void {
            this.channel.dispatch({
                event: 'user@load',
                data: this.project.uuid
            })

            this.usersProperty.connectFn((items: any[]) => {
                this.users = items
            })

            this.watcher.withRepository(this.store.users)
                .withBinding(this.usersProperty)
        }

        public beforeDestroy (): void {
            this.watcher.stop()
        }

        public open (user: any): void {
            this.$router.push({
                name: 'user.edit',
                params: this.$route.params,
                query: {
                    uuid: user.uuid
                }
            })
        }

        public remove (user: any): void {
            this.channel.dispatch({
                event: 'user@delete',
                data: {
                    body: user
                }
            })
        }

        public create (): void {
            this.$router.push({
                name: 'user.create',
                params: this.$route.params
            })
        }
    }
</script>

<style lang="scss"></style>
