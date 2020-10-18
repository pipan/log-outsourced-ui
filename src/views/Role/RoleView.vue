<template>
    <section>
        <filtered-list
            title="Roles"
            @add="create()">
            <double-lined-item
                v-for="item of roles"
                :key="item.uuid"
                :text="item.name"
                :subtext="item.permissions.join(', ')"
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
    export default class RoleView extends Vue {
        @Prop() channel!: Channel<any>
        @Prop() store!: any
        @Prop() project!: any

        public roles: any[] = []
        public rolesProperty: Channel<any> = new ProxyChannel()
        private watcher = new ListWatcher()

        public created (): void {
            this.channel.dispatch({
                event: 'role@load',
                data: this.project.uuid
            })

            this.rolesProperty.connectFn((items: any[]) => {
                this.roles = items
            })

            this.watcher.withRepository(this.store.roles)
                .withBinding(this.rolesProperty)
        }

        public beforeDestroy (): void {
            this.watcher.stop()
        }

        public open (role: any): void {
            this.$router.push({
                name: 'role.edit',
                params: this.$route.params,
                query: {
                    uuid: role.uuid
                }
            })
        }

        public remove (role: any): void {
            this.channel.dispatch({
                event: 'role@delete',
                data: {
                    body: role
                }
            })
        }

        public create (): void {
            this.$router.push({
                name: 'role.create',
                params: this.$route.params
            })
        }
    }
</script>

<style lang="scss"></style>
