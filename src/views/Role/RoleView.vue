<template>
    <section>
        <filtered-list
            title="Roles"
            @add="create()">
            <simple-list-item
                v-for="item of roles"
                :key="item.uuid"
                :text="item.name"
                :value="item"
                :contexts="['Delete']"
                @select="open($event)"
                @delete="remove($event)">
            </simple-list-item>
        </filtered-list>
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    import { Channel, ProxyChannel } from '@wildebeest/observable'
    import Contextmenu from '@/components/contextmenu/Contextmenu.vue'
    import FilteredList from '@/components/list/filtered/FilteredList.vue'
    import SimpleListItem from '@/components/list/simple/SimpleListItem.vue'
    import { ListWatcher, SingleResourceWatcher } from '@/lib/watcher'

    @Component({
        components: {
            Contextmenu,
            FilteredList,
            SimpleListItem
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
            console.log('role open', role)
            // this.$router.push({
            //     name: 'project',
            //     params: {
            //         connectionId: this.$route.params.connectionId,
            //         projectUuid: project.uuid
            //     }
            // })
        }

        public remove (role: any): void {
            console.log('role remove', role)
            this.channel.dispatch({
                event: 'role@delete',
                data: {
                    body: role
                }
            })
        }

        public create (): void {
            console.log('role create')
            this.$router.push({
                name: 'role.create',
                params: this.$route.params
            })
        }
    }
</script>

<style lang="scss"></style>
